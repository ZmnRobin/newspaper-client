import Link from "next/link";

export default function NotFound() {
  return (
    <div className="m-5">
      <h1 className="text-4xl text-red-500">404! Page not found</h1>
      <Link href={"/"} className="text-blue-500 mt-4">
        Go back home
      </Link>
    </div>
  );
}
