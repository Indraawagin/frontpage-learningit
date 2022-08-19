import React from "react";
import Youtube from "react-youtube";
import Accordion, { IconLock, IconPlay, Item } from "src/components/Accordion";
import Modal from "src/components/Modal";

export default function RenderPreview({ previews }) {
  return (
    <div className="accordion">
      <Accordion>
        {(Active, toggle) => {
          return previews?.map((item, index) => {
            return (
              <Item
                id={item.id}
                name={item.name}
                child={item.lessons}
                active={Active}
                toggle={toggle}
                key={`${index}-${item.id}`}
              >
                {item?.lessons?.length > 0 &&
                  item?.lessons?.map((child, index2) => {
                    return (
                      <div
                        key={`${index2}-${child.id}`}
                        className="relative hover:bg-gray-200 flex justify-between item-center pl-8 pr-4 py-2"
                      >
                        <span className="text-gray-600">{child?.name ?? "Course name"}</span>
                        {index2 === 0 && (
                          <Modal
                            content={(toggle) => (
                              <Youtube
                                videoId={child?.video}
                                id={child?.video}
                                opts={{
                                  playerVars: {
                                    autoplay: 1,
                                    controls: 1,
                                  },
                                  width: "100%",
                                }}
                              ></Youtube>
                            )}
                          >
                            {(toggle) => <span onClick={toggle} className="link-wrapped"></span>}
                          </Modal>
                        )}
                        {index2 === 0 && (
                          <IconPlay className="fill-teal-400" width={20} height={20}></IconPlay>
                        )}

                        {index2 !== 0 && <IconLock></IconLock>}
                      </div>
                    );
                  })}
              </Item>
            );
          });
        }}
      </Accordion>
    </div>
  );
}
