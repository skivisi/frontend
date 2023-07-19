/* eslint-disable import/no-anonymous-default-export */

const get = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      specId: 1,
      developmentExperiences: [
        {
          specId: 1,
          startYear: '2020',
          startDate: '01',
          duration: '12 months',
          assignedTask: 'Developing frontend',
          teamSize: '5',
          totalProjectHeadcount: '10',
          projectName: 'Project X',
          jobDuties: 'Coding, Reviewing',
          img: 'imagePath.jpg',
          environments: ['Linux'],
          programmingLanguages: ['JavaScript'],
          frameworks: ['React'],
          tools: ['VS Code'],
        },
      ],
      portfolios: [
        {
          portfolioId: 1,
          specId: 1,
          heading: 'My Portfolio',
          url: 'www.example.com',
        },
      ],
      previousWorks: [
        {
          previousWorkId: 1,
          specId: 1,
          industry: 'IT',
          occupation: 'Engineer',
          JobDuties: 'Coding',
        },
      ],
      qualifications: [
        {
          qualificationId: 1,
          specId: 1,
          credential: 'AWS Certified',
          acquisitionDate: '2020-01-01',
        },
      ],
      sellingPoints: [
        {
          content: 'Fast Learner',
          sellingPointId: 1,
          specId: 1,
          title: 'My Strengths',
        },
      ],
      skillSummaries: [
        {
          environment: ['Linux'],
          programmingLanguage: ['JavaScript'],
          framework: ['React'],
          library: ['Redux'],
          cloud: ['AWS'],
          tool: ['VS Code'],
          developmentDomain: ['Frontend'],
          skillSummaryId: 1,
          specId: 1,
        },
      ],
    })
  );
};

export default { get };
