import clsx from "clsx";
import LoginFormValidationAuth from "../../components/login_form_validation/LoginFormValidation.auth";

export interface ILoginAuthContainerProps {}

export default function LoginAuthContainer(props: ILoginAuthContainerProps) {
  return (
    <div
      className={clsx(
        "grid grid-cols-2 place-content-center place-items-center",
        "w-[100vw] h-[100vh] min-h-[900px] min-w-[1440px]",
        "bg-ghost-white"
      )}
    >
      {/* left side */}
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[3rem] place-content-center place-items-center",
          "min-h-[100vh] w-full"
        )}
      >
        <img
          src={"/illustrations/login.svg"}
          className={clsx("object-cover")}
        />
        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[0.5rem] place-content-center place-items-center",
            "w-full"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full"
            )}
          >
            <h1
              className={clsx("text-[1.75rem] text-charleston-green font-bold")}
            >
              {"Jualan Produk Viral"}
            </h1>
            <h1
              className={clsx("text-[1.75rem] text-charleston-green font-bold")}
            >
              {"Dari Mana Aja, Kapan Aja!"}
            </h1>
          </div>

          <p className={clsx("text-[1rem] text-taupe-gray font-regular")}>
            {"Gabung dan rasakan cara termudah untuk berjualan"}
          </p>
        </div>
      </div>

      {/* end left side */}

      {/* right side */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center gap-y-[1rem]",
          "p-[3rem] rounded-[1rem] max-w-[476px] w-full",
          "shadow-3 bg-white"
        )}
      >
        <img src={"/logo/maahir-full.svg"} />

        <section
          className={clsx(
            "grid grid-cols-1 justify-center justify-items-center gap-y-[1.75rem]",
            "w-full"
          )}
        >
          <title
            className={clsx("text-[1.75rem] text-charleston-green font-bold")}
          >
            {"Masuk ke Supplier Center"}
          </title>
          <LoginFormValidationAuth />
         

          <div>
            <p
              className={clsx(
                "text-[0.875rem] font-regular text-charleston-green"
              )}
            >
              {"Login Anda bermasalah "}

              <span
                className={clsx(
                  "text-ocean-boat-blue font-bold text-[0.875rem]"
                )}
              >
                {"Klik Disini"}
              </span>
            </p>
          </div>
        </section>
      </div>
      {/* end right side */}
    </div>
  );
}
