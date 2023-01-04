import { useContext, useEffect } from "react";
import { fetchBankList } from "@/src/core/lib/api/dynamic";
import { IOptions } from "@/src/core/lib/models";
import { useQuery } from "@tanstack/react-query";
import { ProfileUpdateReactQueryKey } from "../constants";
import { ProfileUpdateContext } from "../contexts/update/ProfileUpdate.context";
import { ProfileUpdateActionEnum } from "../contexts/update/ProfileUpdate.types";

export const useProfileUpdateGetBankList = () => {
  const { dispatch } = useContext(ProfileUpdateContext);
  const query = useQuery<IOptions[]>(
    [ProfileUpdateReactQueryKey.GetBankList],
    () => {
      return fetchBankList();
    }
  );

  useEffect(() => {
    if (query.isSuccess) {
      dispatch({
        type: ProfileUpdateActionEnum.SetBankList,
        payload: query.data.map((item) => item.option_name),
      });
    }
  }, [query.isSuccess]);
  return query;
};
