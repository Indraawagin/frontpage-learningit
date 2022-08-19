import Head from "next/head";
import Circle from "/public/images/circle-accent-1.svg";
import Header from "src/parts/Header";
import Hero from "src/parts/Hero";
import Client from "src/parts/Client";
import ListCourses from "src/parts/ListCourses";
import ListCategories from "src/parts/ListCategories";
import Footer from "src/parts/Footer";

import courses from "/src/constans/api/courses";

function Home({ data }) {
  return (
    <>
      <Head>
        <title>Learning It</title>
      </Head>
      <main>
        <section className="header-clipping pt-10 min-h-screen md:min-h-0">
          <div className="sunshine max-w-full"></div>
          <Circle className="absolute md:left-0 md:bottom-0 md:overflow-hidden hidden md:block"></Circle>
          <div className="container px-4 mx-auto">
            <Header></Header>
            <Hero></Hero>
          </div>
        </section>
        <section className="container px-4 mx-auto md:pt-24">
          <Client></Client>
        </section>
        <section className="container px-4 mx-auto md:pt-24">
          <ListCourses data={data}></ListCourses>
        </section>
        <section className="container px-4 mx-auto md:pt-24">
          <ListCategories></ListCategories>
        </section>
        <section className="mt-24 pt-12 pb-5 bg-blue-900">
          <Footer></Footer>
        </section>
      </main>
    </>
  );
}
Home.getInitialProps = async () => {
  try {
    const data = await courses.all();
    return { data: data.data };
  } catch (error) {
    return error;
  }
};

export default Home;
