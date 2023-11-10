import React from "react";
import SignupButton from "./auth/SignupButton";
import "./Splash.css";
import splash_logo from "../components/images/digitalgeometriclogo.svg";
import landing_splash from "../components/images/landing-splash.webp";

export const Splash = () => {
    return (
        <div className="desktop">
            <div className="div">
                <div className="splash-top">

                    <div className="rectangle" />
                    <div className="rectangle-2" />
                    <p className="text-wrapper">Tacking the Accessibility Issue within STEM Academia</p>
                    <p className="p">Funding and Empowering Academics and Academia</p>
                    <p className="we-aim-to-create-a">
                        We aim to create a platform that grants both students and academics access to quality research. <br />
                        We seek to give researchers easier access to peer reviews and recognition for their work.
                        <br />
                        We aim to revolutionize learning management and collaborative teaching through intuitive networking routes.
                    </p>
                    <p className="GYDE-is-built-not">
                        GYDE is built not only to empower academics, but also to fund researchers through decentralized profits.
                        <br />
                        Half of GYDE’s profits will be allocated to&nbsp;&nbsp;combating teacher wage penalties and rising student
                        debt.
                        <br />
                        We aim to ensure that researchers are paid for their peer reviews and collaborative efforts.
                    </p>
                </div>

                <div className="overlap-group">
                    <div className="splash-black-polygon" />
                    <img className="polygon" alt="Polygon" src="https://c.animaapp.com/TKRxaKer/img/polygon-1.svg" />
                    <img className="landing-splash" alt="landing-splash" src={landing_splash} />
                    <div className="splash-header">Welcome to GYDE</div>
                    <p className="splash-subheader">
                        Funding your Research and Education <br />
                        by Centralizing Educational Services
                    </p>

                    <div className="splash-buttons">
                        <div className="text-wrapper-3">
                            <SignupButton />
                        </div>
                        <a href="#splash-vid">Learn More</a>
                    </div>


                    <div id="splash-vid" className="splash-video" />


                </div>
                <p className="we-believe-that-STEM">
                    We believe that STEM knowledge is best presented: <br />
                    with respect to academic authors <br />
                    and accessible to as many people as possible.
                </p>

                <div className='splash-goals-wrapper'>
                    <div className="splash-goals-item">
                        <div className="splash-icon-wrapper">
                            <i class="fa-solid fa-graduation-cap"></i>
                        </div>
                        <p className="splash-goal-text">
                            Gyde shares will aim to battle the teacher pay wage penalty by giving 40% of company profits back to
                            educators. Gyde can scale to give 150,000 teachers a bonus of $15,000 each annually.
                        </p>
                    </div>

                    <div className="splash-goals-item">
                        <div className="splash-icon-wrapper">
                            <i class="fa-solid fa-arrow-trend-up"></i>
                        </div>
                        <p className="splash-goal-text">
                            Gyde can create a nonprofit that recycles its profits back into the nonprofit sector of Gyde. Uniformly
                            distributing funds between STEM R&amp;D and financial aid can lead to an industrial revolution within
                            academia.
                        </p>
                    </div>
                    <div className="splash-goals-item">
                        <div className="splash-icon-wrapper">
                            <i class="fa-solid fa-children"></i>
                        </div>
                        <p className="splash-goal-text">
                            Gyde will donate 30% of company profits directly to students. These donations will be uniformly distributed
                            among free tutoring for struggling students, projects for advanced students in need of funding, and student
                            tuition for those in need.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};
