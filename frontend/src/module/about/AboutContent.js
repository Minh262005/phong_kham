import React from "react";
import EnsignAnh from "../../Images/anh.png";
import FeedbackButton from "./componentAbout/FeedbackButton";
import LatestNewAbout from "./componentAbout/LatestNewAbout";
import imgAbout1 from "../../Images/Rectangle 1123.png"
import imgAbout2 from "../../Images/Rectangle 1124.png"


function AboutContent() {
  return (
    <div style={{ lineHeight: "30px" }}>
      <div className="w-[100%] h-[40px] flex items-center">
        <span className="mr-[8px] text-4xl">Share: </span>
        <button>
          <img
            className="rounded-full w-[24px] h-[24px] mr-[8px]"
            src={EnsignAnh}
          ></img>
        </button>
        <button>
          <img className="rounded-full w-[24px] h-[24px]" src={EnsignAnh}></img>
        </button>
      </div>
      <div>
        <div className="pt-[10px]">
          <h1 className=" font-semibold pt-[15px] text-4xl">
            Clinicmate Private Clinic
          </h1>
          <p className="pt-[20px] text-3xl font-light leading-relaxed">
            Clinicmate is a healthcare system developed by students from FPT
            University, a multi-disciplinary private university in Vietnam.
          </p>
          <p className="pt-[20px] text-3xl font-light leading-relaxed">
            With state-of-the-art facilities, a team of experienced experts and
            doctors, continuous adoption of the latest global treatment methods,
            and excellent service quality, Clinicmate has become a trusted
            international standard healthcare provider in Vietnam.
          </p>
          <p className="pt-[20px] text-3xl font-light leading-relaxed">
            Over the years, Clinicmate has been striving to fulfill its noble
            mission of becoming a private healthcare system in Vietnam, with the
            following achievements:
          </p>
        </div>
        <div className="pt-[5px] pl-[3%]">
          <ul className="font-light" style={{ listStyle: "disc" }}>
            <li>Operating not for profit-oriented goals.</li>
            <li className="pt-[5px]">
              Having two private hospitals that meet the strictest safety
              standards of JCI (Joint Commission International).
            </li>
            <li className="pt-[5px]">
              Investing significantly in research and technology to enhance the
              quality of healthcare services.
            </li>
          </ul>
        </div>
        <div className="pt-[10px]">
          <p className="font-light text-3xl">
            Structured into three closely connected components:
          </p>
          <div className="pl-[3%] pt-[10px]">
            <ul className="font-light" style={{ listStyle: "disc" }}>
              <li>Operating not for profit-oriented goals.</li>
              <li className="pt-[5px]">
                Having two private hospitals that meet the strictest safety
                standards of JCI (Joint Commission International).
              </li>
              <li className="pt-[5px]">
                Investing significantly in research and technology to enhance
                the quality of healthcare services.
              </li>
            </ul>
          </div>
          <p className=" pt-[10px] font-light text-3xl">
            In addition to developing a chain of hospitals, Clinicmate also
            establishes and develops specialized research institutes.
          </p>
        </div>
        <div
          className="w-[35%] h-[250px] rounded-[20px] overflow-hidden"
          style={{ margin: "40px auto" }}
        >
          <img src={imgAbout1}></img>
        </div>
        <div>
          <h1 className=" font-semibold text-4xl">Vision</h1>
          <p className="pt-[20px] text-3xl font-light leading-relaxed">
            To become an internationally renowned academic healthcare system
            with three pillars: groundbreaking research, excellent treatment
            quality, and perfect care services.
          </p>
        </div>
        <div className="pt-[5   px]">
          <h1 className=" font-semibold pt-[15px] text-4xl">Mission</h1>
          <p className="pt-[20px] text-3xl font-light leading-relaxed">
            To provide care with talent, integrity, and empathy.
          </p>
        </div>
        <div
          className="w-[35%] h-[250px] rounded-[20px] overflow-hidden"
          style={{ margin: "40px auto" }}
        >
          <img src={imgAbout2}></img>
        </div>
        <div>
          <h1 className=" font-semibold pt-[15px] text-4xl">Core Values</h1>
          <p className="pt-[20px] text-3xl font-light leading-relaxed">
            The four letters C-A-R-E represent the following meanings:
          </p>
          <div className="pl-[3%] pt-[5px]">
            <ul className="font-light" style={{ listStyle: "disc" }}>
              <li>
                Creativity: Constantly innovate and bring forth innovative
                solutions for patients.
              </li>
              <li>
                Accountability: Take the highest responsibility towards patients
                and their families in terms of integrity, skills, knowledge, and
                professional standards at Vinmec.
              </li>
              <li>
                Reliability: Commit to doing only what is best for patients and
                provide the highest level of reliability to the community.
              </li>
              <li>
                Excellence: Strive for the highest quality of service and
                excellent healthcare processes.
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-[3%]">
          <h1 className=" font-semibold pt-[15px] text-4xl">
            Commitment to Customers
          </h1>
          <div className="pl-[3%] pt-[5px]">
            <ul className="font-light" style={{ listStyle: "disc" }}>
              <li>Patients are examined by highly skilled experts.</li>
              <li>
                Clinical practice is evidence-based, ensuring the quality of
                patient care.
              </li>
              <li>
                Hospitals are operated with a priority on patient safety and
                undergo regular evaluations and thorough analysis to improve
                service quality.
              </li>
              <li>
                Patient health status is continuously assessed before, during,
                and after treatment.
              </li>
              <li>
                Treatment protocols for patients are carefully selected to
                ensure suitability and effectiveness for each case.
              </li>
              <li>
                Patients and their families are educated and provided with
                health care knowledge.
              </li>
              <li>
                Patient rights are respected and emphasized, especially the
                rights to privacy and information security, as well as
                addressing psychological and cultural needs.
              </li>
              <li>
                Adherence to hospital infection control procedures and
                regulations to minimize the risk of hospital-acquired infections
                for patients.
              </li>
              <li>
                All staff members participate in emergency response training
                courses to ensure patient safety.
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-[3%]  text-[#5365f7]">
          <h1 className=" font-semibold pt-[15px] text-4xl">
            For more information:
          </h1>
          <div className="pl-[3%] pt-[5px]">
            <ul className="font-semibold" style={{ listStyle: "disc" }}>
              <li>
                <a href="#">
                  Clinicmate creates a distinctive value in the healthcare
                  sector in Vietnam.
                </a>
              </li>
              <li>
                <a href="#">
                  Clinicmate has been honored as the "Most Progressive Hospital"
                  and "Safe for Patients."
                </a>
              </li>
              <li>
                <a href="#">
                  Clinicmate successfully performed an artificial heart
                  transplant to support end-stage heart failure patients.
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-14">
          <FeedbackButton></FeedbackButton>
        </div>
        <div className="pt-16">
          <LatestNewAbout />
        </div>
      </div>
    </div>
  );
}
export default AboutContent;
