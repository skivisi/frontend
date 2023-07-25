/* eslint-disable import/no-anonymous-default-export */

const get = (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json({
      affiliation: 'Some affiliation',
      businessSituation: 'Some business situation',
      createdAt: '2023-06-01T00:00:00.000Z',
      email: 'user@example.com',
      employeeNumber: 1,
      joinDate: '2023-06-01',
      updatedAt: '2023-06-01T00:00:00.000Z',
      userId: 1,
      userName: 'Some user',
      skillPoints: [
        {
          AR: 10,
          BK: 20,
          COM: 30,
          DB: 40,
          FR: 50,
          SBR: 60,
          TS: 70,
          skillPointId: 1,
          userId: 1,
        },
      ],
      skills: [
        {
          InherentDescription: 'Some description',
          InherentName: 'Some name',
          skillId: 1,
          updatedAt: '2023-06-01T00:00:00.000Z',
          userId: 1,
        },
      ],
      specialAbilities: [
        {
          spaecialAbilityId: 1,
          userId: 1,
          skillList: 'Some skill list',
          skillSelection: true,
          tagColor: 1,
        },
      ],
      specs: [
        {
          createdAt: '2023-06-01T00:00:00.000Z',
          github: 'https://github.com/user',
          offHours: '5 hours',
          searchs: true,
          specId: 1,
          userId: 1,
        },
      ],
      request: {
        applicationId: 1,
        userId: 1,
        status: 0,
        adminComment: 'Some admin comment',
        engineerComment: 'Some engineer comment',
        adminId: 1,
        createdAt: '2023-06-01T00:00:00.000Z',
        resultedAt: '2023-06-01T00:00:00.000Z',
      },
    })
  );
};

export default { get };
