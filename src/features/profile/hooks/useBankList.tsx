import { fetchBankList } from "@/src/core/lib/api/dynamic";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { IOptions } from "@/src/core/lib/models";
import { useQuery } from "@tanstack/react-query";

export const useBankListQuery = () =>
  useQuery<IOptions[]>([ReactQueryKey.GetBankList], fetchBankList);

export const useBankListData = () =>
  useBankListQuery().data?.map((item) => item.option_name);
