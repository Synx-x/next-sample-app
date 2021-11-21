import { sql_query } from "../../lib/dbcon";
import {
  generateInterface,
  formatQueryToJson,
} from "../../lib/generateInterface";
import { Iusers } from "../../lib/types";
import pageStyles from "../../styles/pages/Course.module.scss";
import Link from "next/link";
import { DbQuery } from "../../lib/dbQuery";
import { useState } from "react";
import Image from "next/image";
import sampleImage from "./sample.jpg";

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  generateInterface(data, "users");
  return { props: { users: data } };
};

export default function Course(props: any) {
  const [accordionActive, setAccordionActive] = useState(false);
  const [accordionActiveValue, setaccordionActiveValue] = useState(0);

  const users: Iusers[] = props.users;

  const toggleAccordion = (value: number) => {
    setaccordionActiveValue(value);

    setAccordionActive(!accordionActive);

    if (value !== accordionActiveValue) {
      setAccordionActive(true);
    }
  };

  return (
    <main className={pageStyles.main}>
      <section className={pageStyles.searchbarContainer}>
        <input
          type="search"
          placeholder="Search Topics | Video Name | Courses | More"
        />
      </section>

      <header className={pageStyles.courseInformation}>
        <h1>Course Name</h1>
        <p>Course Description</p>
      </header>

      <section
        className={
          accordionActive
            ? pageStyles.courseContent
            : pageStyles.courseContent + " " + pageStyles.courseContentInactive
        }
      >
        {users.map((user: Iusers, index: number) => (
          <>
            <div
              key={user.id}
              className={
                accordionActive && accordionActiveValue == user.id
                  ? pageStyles.accordion + " " + pageStyles.accordionActive
                  : pageStyles.accordion
              }
            >
              <div
                key={user.id}
                className={
                  accordionActive && accordionActiveValue == user.id
                    ? pageStyles.accordionVideo +
                      " " +
                      pageStyles.accordionVideoActive
                    : pageStyles.accordionVideo
                }
              ></div>
              <h2>{user.name}</h2>
              <h2>{user.phone}</h2>
              <h2>{user.username}</h2>
              <button onClick={() => toggleAccordion(user.id)}>
                {accordionActive && accordionActiveValue == user.id
                  ? "collapse"
                  : "expand"}
              </button>
            </div>
          </>
        ))}
      </section>
    </main>
  );
}
