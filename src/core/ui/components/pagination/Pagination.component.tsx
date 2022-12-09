import React, { useState, useEffect } from "react";
import clsx from "clsx";
import ChevronIcon from "../../icons/chevron/Chevron.icon";

const handleLeftBullet: (
  totalPage: number,
  currentPage: number,
  siblingCount: number
) => boolean = (
  totalPage: number,
  currentPage: number,
  siblingCount: number
) => {
  // 2 for last and first number
  const firstNumberCount = 1;
  const lastNumberCount = 1;
  const middleNumberCount = 1;

  if (totalPage <= firstNumberCount + lastNumberCount) {
    return false;
  }

  if (totalPage > firstNumberCount + lastNumberCount) {
    if (
      totalPage <=
      firstNumberCount + lastNumberCount + middleNumberCount + 2 * siblingCount
      // times 2 because left and right sibling
    ) {
      // i selalu dari 0
      return false;
    }
    if (
      totalPage >
      firstNumberCount + lastNumberCount + middleNumberCount + 2 * siblingCount
    ) {
      // cek array dari awal
      if (currentPage < firstNumberCount + siblingCount + middleNumberCount) {
        // return 2,3,4,5,6

        return false;
      }
      // cek array dari akhir
      if (currentPage >= totalPage - siblingCount - middleNumberCount) {
        return true;
      }

      if (
        currentPage >= firstNumberCount + siblingCount + middleNumberCount &&
        currentPage <=
          totalPage - siblingCount - middleNumberCount - lastNumberCount
      ) {
        return true;
      }
    }

    return false;
  }
  return false;
};

const handleMiddleArray: (
  totalPage: number,
  currentPage: number,
  siblingCount: number
) => number[] = (
  totalPage: number,
  currentPage: number,
  siblingCount: number
) => {
  // 2 for last and first number
  const firstNumberCount = 1;
  const lastNumberCount = 1;
  const middleNumberCount = 1;

  if (totalPage <= firstNumberCount + lastNumberCount) {
    return [];
  }

  if (totalPage > firstNumberCount + lastNumberCount) {
    if (
      totalPage <=
      firstNumberCount + lastNumberCount + middleNumberCount + 2 * siblingCount
      // times 2 because left and right sibling
    ) {
      // i selalu dari 0
      return Array.from(
        { length: totalPage - (firstNumberCount + lastNumberCount) },
        (_, i) => i + 1 + firstNumberCount
      );
    }

    if (
      totalPage >
      firstNumberCount + lastNumberCount + middleNumberCount + 2 * siblingCount
    ) {
      // cek array dari awal
      if (currentPage < firstNumberCount + siblingCount + middleNumberCount) {
        // return 2,3,4,5,6

        return Array.from(
          {
            length: middleNumberCount + 2 * siblingCount,
          },
          (_, i) => i + firstNumberCount + middleNumberCount
        );
      }
      // cek array dari akhir
      if (currentPage >= totalPage - siblingCount - middleNumberCount) {
        return Array.from(
          {
            length: middleNumberCount + 2 * siblingCount,
          },
          (_, i) => totalPage - middleNumberCount - 2 * siblingCount + i
        );
      }

      if (
        currentPage >= firstNumberCount + siblingCount + middleNumberCount &&
        currentPage <=
          totalPage - siblingCount - middleNumberCount - lastNumberCount
      ) {
        return Array.from(
          {
            length: middleNumberCount + 2 * siblingCount,
          },
          (_, i) => currentPage - siblingCount + i
        );
      }
    }
    // ini logic aneh
    return [];
  }
  return [];
};

const handleRightBullet: (
  totalPage: number,
  currentPage: number,
  siblingCount: number
) => boolean = (
  totalPage: number,
  currentPage: number,
  siblingCount: number
) => {
  // 2 for last and first number
  const firstNumberCount = 1;
  const lastNumberCount = 1;
  const middleNumberCount = 1;

  if (totalPage <= firstNumberCount + lastNumberCount) {
    return false;
  }

  if (totalPage > firstNumberCount + lastNumberCount) {
    if (
      totalPage <=
      firstNumberCount + lastNumberCount + middleNumberCount + 2 * siblingCount
      // times 2 because left and right sibling
    ) {
      // i selalu dari 0
      return false;
    }
    if (
      totalPage >
      firstNumberCount + lastNumberCount + middleNumberCount + 2 * siblingCount
    ) {
      // cek array dari awal
      if (currentPage < firstNumberCount + siblingCount + middleNumberCount) {
        // return 2,3,4,5,6

        return true;
      }
      // cek array dari akhir
      if (currentPage >= totalPage - siblingCount - middleNumberCount) {
        return false;
      }

      if (
        currentPage >= firstNumberCount + siblingCount + middleNumberCount &&
        currentPage <=
          totalPage - siblingCount - middleNumberCount - lastNumberCount
      ) {
        return true;
      }
    }

    return false;
  }
  return false;
};

export interface IPaginationComponentProps {
  totalPage: number;
  currentPage: number;
  sibblingCount: number;
  onChangePage?: (data: number) => void;
}

PaginationComponent.defaultProps = {
  totalPage: 10,
  currentPage: 1,
  sibblingCount: 2,
};

export default function PaginationComponent(props: IPaginationComponentProps) {
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [sibblingCount, setSibblingCount] = useState<number>(0);

  const [middleArrayPage, setMiddleArrayPage] = useState<number[]>([]);
  const [leftBulletCondition, setLeftBulletCondition] =
    useState<boolean>(false);
  const [rightBulletCondition, setRightBulletCondition] =
    useState<boolean>(false);

  useEffect(() => {
    if (props.totalPage > 0) {
      setTotalPage(props.totalPage);
    }
  }, [props.totalPage]);

  useEffect(() => {
    if (props.currentPage > 0) {
      setCurrentPage(props.currentPage);
    }
  }, [props.currentPage]);

  useEffect(() => {
    if (props.sibblingCount > 0) {
      setSibblingCount(props.sibblingCount);
    }
  }, [props.sibblingCount]);

  useEffect(() => {
    if (currentPage > 0 && sibblingCount > 0 && totalPage > 0) {
      const result = handleLeftBullet(totalPage, currentPage, sibblingCount);
      setLeftBulletCondition(result);
    }
  }, [currentPage, sibblingCount, totalPage]);

  useEffect(() => {
    if (currentPage > 0 && sibblingCount > 0 && totalPage > 0) {
      const result = handleMiddleArray(totalPage, currentPage, sibblingCount);
      setMiddleArrayPage(result);
    }
  }, [currentPage, sibblingCount, totalPage]);

  useEffect(() => {
    if (currentPage > 0 && sibblingCount > 0 && totalPage > 0) {
      const result = handleRightBullet(totalPage, currentPage, sibblingCount);
      setRightBulletCondition(result);
    }
  }, [currentPage, sibblingCount, totalPage]);

  const handleClickPreviousPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = currentPage === 1 ? 1 : currentPage - 1;
    setCurrentPage(result);
  };

  const handleClickFirstPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const page = 1;
    setCurrentPage(page);
  };

  const handleClickPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const page = parseInt(e.currentTarget.value);
    setCurrentPage(page);
  };

  const handleClickLastPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(totalPage);
  };

  const handleClickNextPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const result = currentPage === totalPage ? totalPage : currentPage + 1;
    setCurrentPage(result);
  };

  useEffect(() => {
    if (props.onChangePage) {
      props.onChangePage(currentPage);
    }
  }, [currentPage]);
  return (
    <div className={clsx("flex gap-x-[0.5rem] items-center justify-between")}>
      <button
        className={clsx(
          "flex items-center justify-center",
          "w-[2rem] h-[2rem] rounded-[0.25rem]",
          "border border-platinum",
          "bg-ghost-white-2"
        )}
        disabled={currentPage === 1}
        onClick={handleClickPreviousPage}
      >
        <ChevronIcon
          className={clsx(
            "w-[1.5rem] h-[1.5rem]",
            "rotate-180",
            currentPage === 1 ? "fill-lavender-gray" : "fill-charleston-green"
          )}
        />
      </button>

      <button
        className={clsx(
          "flex items-center justify-center",
          "w-[2rem] h-[2rem] rounded-[0.25rem]",
          "border border-platinum",
          currentPage === 1 ? "bg-ocean-boat-blue" : "bg-ghost-white-2"
        )}
        value={1}
        onClick={handleClickFirstPage}
      >
        <p
          className={clsx(
            "text-[0.875rem] font-medium",
            currentPage === 1 ? "text-white" : "text-charleston-green"
          )}
        >
          {"1"}
        </p>
      </button>

      {/* left bullet */}
      {leftBulletCondition && (
        <button
          className={clsx(
            "flex items-center justify-center",
            "w-[2rem] h-[2rem] rounded-[0.25rem]",
            "border border-platinum",
            "bg-ghost-white-2"
          )}
        >
          <p
            className={clsx(
              "text-[0.875rem] font-medium",
              "text-charleston-green"
            )}
          >
            {"..."}
          </p>
        </button>
      )}

      {/* middle page */}
      {middleArrayPage.map((item, index) => (
        <button
          key={index}
          className={clsx(
            "flex items-center justify-center",
            "w-[2rem] h-[2rem] rounded-[0.25rem]",
            "border border-platinum",
            currentPage === item ? "bg-ocean-boat-blue" : "bg-ghost-white-2"
          )}
          value={item}
          onClick={handleClickPage}
        >
          <p
            className={clsx(
              "text-[0.875rem] font-medium",
              currentPage === item ? "text-white" : "text-charleston-green"
            )}
          >
            {item}
          </p>
        </button>
      ))}

      {/* right bullet */}
      {rightBulletCondition && (
        <button
          className={clsx(
            "flex items-center justify-center",
            "w-[2rem] h-[2rem] rounded-[0.25rem]",
            "border border-platinum",
            "bg-ghost-white-2"
          )}
        >
          <p
            className={clsx(
              "text-[0.875rem] font-medium",
              "text-charleston-green"
            )}
          >
            {"..."}
          </p>
        </button>
      )}

      {props.totalPage !== 1 && (
        <button
          className={clsx(
            "flex items-center justify-center",
            "w-[2rem] h-[2rem] rounded-[0.25rem]",
            "border border-platinum",
            currentPage === totalPage
              ? "bg-ocean-boat-blue"
              : "bg-ghost-white-2"
          )}
          value={totalPage}
          onClick={handleClickLastPage}
        >
          <p
            className={clsx(
              "text-[0.875rem] font-medium",
              currentPage === totalPage ? "text-white" : "text-charleston-green"
            )}
          >
            {totalPage}
          </p>
        </button>
      )}

      <button
        className={clsx(
          "flex items-center justify-center",
          "w-[2rem] h-[2rem] rounded-[0.25rem]",
          "border border-platinum",
          "bg-ghost-white-2"
        )}
        disabled={currentPage === totalPage}
        onClick={handleClickNextPage}
      >
        <ChevronIcon
          className={clsx(
            "w-[1.5rem] h-[1.5rem]",
            currentPage === totalPage
              ? "fill-lavender-gray"
              : "fill-charleston-green"
          )}
        />
        {/* <img src={"/icons/pagination-arrow-active.svg"} /> */}
      </button>
    </div>
  );
}
