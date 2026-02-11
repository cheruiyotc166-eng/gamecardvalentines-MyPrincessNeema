import Link from "next/link";

export default function TextFooter() {
  return (
    <>
      {/* Copyright */}
      <p className="absolute bottom-5 right-5 text-white text-sm opacity-15 hover:opacity-50">
        © {new Date().getFullYear()}{" "}
        <Link href="https://visibait.com">visibait.com</Link>
      </p>
    </>
  );
}
