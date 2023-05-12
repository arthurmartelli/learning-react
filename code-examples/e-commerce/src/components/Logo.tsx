import LogoSVG from "@/assets/logo.svg";

export default function Logo({
  width = "2rem",
  height = "2rem",
}: {
  width?: string;
  height?: string;
}) {
  return (
    <img
      src={LogoSVG}
      className="logo"
      alt="Logo"
      style={{
        width: width,
        height: height,
      }}
    />
  );
}
