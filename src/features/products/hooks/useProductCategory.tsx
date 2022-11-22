import { fetchProductCategory } from "@/src/core/lib/api/dynamic";
import { ReactQueryKey } from "@/src/core/lib/constants";
import { IOptions } from "@/src/core/lib/models";
import { useQuery } from "@tanstack/react-query";

export const useProductCategoryQuery = () =>
  useQuery<IOptions[]>(
    [ReactQueryKey.GetProductCategory],
    fetchProductCategory
  );

//   export const useTodosQuery = (select) =>
//   useQuery(['todos'], fetchTodos, { select })

// export const useTodosCount = () => useTodosQuery((data) => data.length)
// export const useTodo = (id) =>
//   useTodosQuery((data) => data.find((todo) => todo.id === id))
