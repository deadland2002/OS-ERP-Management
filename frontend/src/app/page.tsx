import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export default function Home() {
  const cookieFactory = cookies()
  const accessToken = cookieFactory.get("accessToken")?.value;

  if(!accessToken)
      return redirect("/auth");

  return redirect("/dashboard");
}
