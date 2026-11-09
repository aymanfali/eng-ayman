import Image from "next/image";

type DeveloperCreditProps = {
  label: string;
  name: string;
};

export function DeveloperCredit({ label, name }: DeveloperCreditProps) {
  return (
    <div className="flex flex-col items-center">
      <p className="my-2 text-xs text-muted-foreground">
        {label}{" "}
        <a
          href="https://aymanfahd.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary transition-colors hover:text-foreground"
        >
          {name}
        </a>
      </p>
      <Image
        src="/ayman.svg"
        width={24}
        height={24}
        alt=""
        aria-hidden="true"
        className="my-2"
      />
    </div>
  );
}
