import axios from "axios";
import { useInfiniteQuery } from "react-query";

const PAGE_SIZE = 10;

const fetchWords = async (filterParams: any, pageParam: number) => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json",
      {
        params: {
          pageNumber: pageParam,
          ...filterParams,
        },
      }
    );

    return {
      ...response.data,
      currentPage: pageParam,
    };
  } catch (e) {
    console.log({ e });
  }
};

const usePagination = (filterParams: any) => {
  return useInfiniteQuery(
    ["english-words", filterParams],
    ({ pageParam = 0 }) => fetchWords(filterParams, pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { count, currentPage } = lastPage;

        const totalPages = Math.ceil(count / PAGE_SIZE);

        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
    }
  );
};

export default usePagination;
