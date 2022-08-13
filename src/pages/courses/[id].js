import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Youtube from "react-youtube";
import { CSSTransition } from "react-transition-group";
import formatThousand from "src/helpers/formatThousand";
import courses from "src/constans/api/courses";

import Header from "src/pages/parts/Header";
import Footer from "src/pages/parts/Footer";

import Feature from "src/pages/parts/Details/Feature";
import CoursePhoto from "src/pages/parts/Details/CoursePhoto";
import RenderPreview from "src/pages/parts/Details/RenderPreview";
import ReviewStudent from "src/pages/parts/Details/ReviewStudent";

// SVG
import Nametag from "/public/images/icon-nametag.svg";
import Playback from "/public/images/icon-playback.svg";
import Certificate from "/public/images/icon-certificate.svg";

function DetailsCourse({ data }) {
  const footer = useRef(null);
  const [isSticky, setIsSticky] = useState(() => true);
  useEffect(() => {
    const stickyOffsetTop = footer.current.getBoundingClientRect().top;
    const stickyMetaToggler = () => {
      setIsSticky(stickyOffsetTop >= window.pageYOffset + window.innerHeight);
    };
    window.addEventListener("scroll", stickyMetaToggler);
    return () => {
      window.removeEventListener("scroll", stickyMetaToggler);
    };
  }, []);

  return (
    <>
      <Head>
        <title>LearningIt</title>
      </Head>
      <section style={{ height: 660 }} className="pt-10 relative overflow-hidden">
        {data?.chapters?.[0]?.lessons?.[0].video && (
          <div className="video-wrapper">
            <Youtube
              videoId={data?.chapters?.[0]?.lessons?.[0].video}
              id={data?.chapters?.[0]?.lessons?.[0].video}
              opts={{
                playerVars: {
                  loop: 1,
                  mute: 1,
                  autoplay: 1,
                  controls: 0,
                },
              }}
              onEnd={(event) => {
                event.target.playVideo();
              }}
            ></Youtube>
          </div>
        )}
        <div className="absolute inset-0 z-0 w-full h-full bg-black opacity-75"></div>
        <div className="meta-title absolute inset-0 object-fill z-0 w-full flex justify-center items-center">
          <div className="text-center">
            <h3 className="text-lg text-white">Kelas Online</h3>
            <h4 className="text-6xl text-teal-500 font-semibold">{data?.name ?? "Nama Kelas"}</h4>
          </div>
        </div>
        <div className="container mx-auto z-10 relative">
          <Header></Header>
        </div>
      </section>

      <section className="container mx-auto pt-24 relative">
        <div className="absolute top-0 w-full transform -translate-y-1/2">
          <div className="w-3/4 mx-auto">
            <div className="flex justify-between">
              <Feature
                data={{
                  icon: <Nametag className="fill-teal-400" />,
                  name: "Student",
                  value: data?.total_student,
                }}
              ></Feature>
              <Feature
                data={{
                  icon: <Playback className="fill-teal-400" />,
                  name: "Video",
                  value: data?.total_videos,
                }}
              ></Feature>
              <Feature
                data={{
                  icon: <Certificate className="fill-teal-400" />,
                  name: "Certificate",
                  value: data?.certificate === 1 ? "TERSEDIA" : "-",
                }}
              ></Feature>
            </div>
          </div>
        </div>

        <div>
          <CSSTransition in={isSticky} timeout={300} classNames="meta-price" unmountOnExit>
            <div className="meta-price w-full bg-white z-50 left-0 py-3">
              <div className="w-3/4 mx-auto">
                <div className="flex items-center">
                  <div className="w-full">
                    <h2 className="text-gray-600">Nama Kelas</h2>
                    <h3 className="text-2xl to-gray-900">{data?.name ?? "Nama Kelas"}</h3>
                  </div>
                  <h5 className="text-2xl text-teal-400 whitespace-nowrap mr-4">
                    {data?.type === "free" ? "Free" : <span>Rp {formatThousand(data.price)}</span>}
                  </h5>
                  <a
                    href={`${process.env.NEXT_PUBLIC_MEMBERPAGE_URL}/joined/${data.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner px-6
                     text-white py-3 whitespace-nowrap"
                  >
                    {data?.type === "free" ? "Enroll Now" : "Buy Now"}
                  </a>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>

        <div className="w-3/4 mx-auto mt-8">
          <div className="w-3/4">
            <section>
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                About <span className="text-teal-400">Course</span>
              </h6>
              <p className="text-gray-600 text-lg leading-relaxed mb-3">
                {data?.description ?? "No Description Found"}
              </p>
            </section>

            <section className="mt-10">
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                Course <span className="text-teal-400">Photos</span>
              </h6>
              <div className="flex justify-start items-center -mx-4 mt-6">
                {data?.images?.length > 0 ? (
                  data?.images?.map?.((photo, index) => (
                    <CoursePhoto data={photo.image} key={index} />
                  ))
                ) : (
                  <div className="w-full text-center py-12">No Images Found</div>
                )}
              </div>
            </section>

            <section className="mt-10">
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                You Will <span className="text-teal-400">Learn</span>
              </h6>
              {data?.chapters?.length > 0 ? (
                <RenderPreview previews={data.chapters}></RenderPreview>
              ) : (
                <div className="w-full text-center py-12">No Chapters Found</div>
              )}
            </section>

            <section className="mt-10 w-2/3">
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                Our <span className="text-teal-400">Mentor</span>
              </h6>
              <div className="flex items-center">
                <img
                  src={data?.mentor?.profile ?? ""}
                  alt={data?.mentor?.name}
                  className="w-20 h-20 rounded-full overflow-hidden object-cover"
                />
                <div className="ml-4">
                  <h2 className="text-lg text-gray-900">{data?.mentor?.name ?? "Mentor's Name"}</h2>
                  <h3 className="text-sm text-gray-600">
                    {data?.mentor?.profession ?? "Mentor's Proffesion"}
                  </h3>
                </div>
              </div>
            </section>

            <section className="mt-10 w-1/2">
              <h6 className="font-medium text-gray-900 text-2xl mb-4">
                Review <span className="text-teal-400">Student</span>
              </h6>
              {data?.reviews?.length > 0 ? (
                data?.reviews?.map?.((testimonial, index) => {
                  return <ReviewStudent key={index} data={testimonial}></ReviewStudent>;
                })
              ) : (
                <p className="text-gray-600 text-lg leading-relaxed mb-3">No Reviews</p>
              )}
            </section>
          </div>
        </div>
      </section>

      <section className="mt-24 pt-12 pb-5 bg-blue-900" ref={footer}>
        <Footer></Footer>
      </section>
    </>
  );
}

DetailsCourse.getInitialProps = async (props) => {
  const { id } = props.query;
  try {
    const data = await courses.details(id);

    return { data };
  } catch (error) {}
};

export default DetailsCourse;
