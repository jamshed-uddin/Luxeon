import { usePathname, useRouter, useSearchParams } from "next/navigation";

const useDeleteUrlQuery = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const deleteUrlQuery = (queryKey: string) => {
    const params = new URLSearchParams(searchParams);

    params.delete(queryKey);

    replace(`${pathname}?${params?.toString()}`);
  };

  return deleteUrlQuery;
};

export default useDeleteUrlQuery;
