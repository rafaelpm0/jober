import Image from "next/image";
import Header from "../../components/header"


export default function Home({children}) {
  return (
    <>
    <Header/>
    <main>
      {children}
    </main>
    </>

  );
}
