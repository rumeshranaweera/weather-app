"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { type CityData } from "@/types/types";
import { MapPin } from "lucide-react";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  useEffect(() => {
    setInput("colombo");
  }, []);

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const request = debounce(async () => {
    refetch();
  }, 400);

  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return [];
      const { data } = await axios.post("/api/searchLocation", { input });
      return data as unknown as CityData[];
    },
    queryKey: ["search-query"],
    enabled: false,
  });
  useEffect(() => {
    setInput("");
  }, [pathname]);

  const isInputActive = useMemo(() => !!inputRef.current?.focus, []);

  return (
    <Command
      ref={commandRef}
      className={`relative z-50 max-w-lg overflow-visible border rounded-lg transition mx-auto ${
        isInputActive ? "bg-white" : "bg-zinc-100"
      }`}
    >
      <CommandInput
        isLoading={isFetching}
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className="border-none outline-none focus:border-none group focus:outline-none ring-0 "
        placeholder="Search location..."
      />

      {input.length > 0 && (
        <CommandList
          className="absolute inset-x-0 bg-white shadow top-full rounded-b-md"
          ref={inputRef}
        >
          {isFetched && <CommandEmpty>No results found.</CommandEmpty>}
          {(queryResults?.length ?? 0) > 0 && (
            <CommandGroup heading="Locations">
              {queryResults?.map((location) => (
                <CommandItem
                  className="even:!bg-white"
                  onSelect={() => {
                    router.replace(`?lat=${location.lat}&lon=${location.lon}`);
                    // router.refresh();
                    setInput("");
                  }}
                  key={location.lat}
                  value={location.name}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {location.name} ,{" "}
                  <span>
                    {location.state}, {location.country}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
