import { fetchDistrictList } from "@/src/core/lib/api/dynamic";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { IOptions } from "@/src/core/lib/models";
import { useQuery } from "@tanstack/react-query";

export const useDistrictListQuery = () =>
  useQuery<IOptions[]>([ReactQueryKey.GetBankList], fetchDistrictList);

export const useDistrictListData = () =>
  useDistrictListQuery().data?.map((item) => item.option_name);
