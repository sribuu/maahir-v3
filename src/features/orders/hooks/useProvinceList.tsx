import { fetchBankList, fetchProvinceList } from "@/src/core/lib/api/dynamic";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { IOptions } from "@/src/core/lib/models";
import { useQuery } from "@tanstack/react-query";

export const useProvinceListQuery = () =>
  useQuery<IOptions[]>([ReactQueryKey.GetProvinceList], fetchProvinceList);

export const useProvinceListData = () =>
  useProvinceListQuery().data?.map((item) => item.option_name);
