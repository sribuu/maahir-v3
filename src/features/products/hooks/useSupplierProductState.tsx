import { useState, useEffect } from "react";
import { IGetSupplierProductRequest } from "../models";

export const useSearchSupplierProduct = () => {
  const [search, setSearch] = useState<string>("");
  return {
    search,
    setSearch,
  };
};

export const useSwitchTabSupplierProduct = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return {
    activeTab,
    setActiveTab,
  };
};

export const usePayloadSupplierProduct = (
  data?: IGetSupplierProductRequest
) => {
  const [payload, setPayload] = useState<IGetSupplierProductRequest>({
    limit: 100,
    offset: 0,
    is_show: true,
    title_like: "",
  });

  useEffect(() => {
    if (data !== undefined) {
      setPayload(data);
    }
  }, [data]);

  return {
    payload,
    setPayload,
  };
};
