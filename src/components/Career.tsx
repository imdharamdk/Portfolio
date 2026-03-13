import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Analyst (Sales Agent)</h4>
                <h5>eClerx Services Limited · Chandigarh IT Park</h5>
              </div>
              <h3>Jul 2023 – Apr 2025</h3>
            </div>
            <p>
              Drove premium device sales for Apple, Samsung, Motorola, and
              Google while surpassing six+ mission-critical KPIs (NPS, AICR,
              CHT, FRT, shift adherence). Recognized as Training Champion and
              supported WFM/LAT teams with high-urgency coverage and AI/cloud
              enablement sessions.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Customer Support Specialist</h4>
                <h5>Teleperformance · Mohali</h5>
              </div>
              <h3>Dec 2022 – Jun 2023</h3>
            </div>
            <p>
              Hit 300+ monthly retention saves for satellite radio services
              through strategic upsell/cross-sell motions. Built data-driven
              retention cadences that lifted customer lifetime value and kept
              conversion rates ahead of target.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Virtual Customer Service Associate</h4>
                <h5>Amazon · Chandigarh</h5>
              </div>
              <h3>Jul 2022 – Dec 2022</h3>
            </div>
            <p>
              Delivered frictionless e-commerce support, resolved complex order
              and logistics issues, and collaborated across functions to improve
              customer experience workflows.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Customer Service Associate</h4>
                <h5>Conneqt Business Solutions · Mohali</h5>
              </div>
              <h3>Mar 2022 – Jul 2022</h3>
            </div>
            <p>
              Provided multi-line customer and technical support, adapting
              quickly to new systems while maintaining top-tier service quality
              and preparing for future cloud and web initiatives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
