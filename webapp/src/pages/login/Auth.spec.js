import firebase from 'firebase/app';
import { auth } from './Auth';

const mockedUserAuthData = {
  uid: 'asd909j-ajsdasdajs-dajs8dajs',
  displayName: 'mocked user',
  email: 'mocked@email.com',
  photoURL: 'http://my.photo.com'
};

const mockedUserProgress = {
  level: 3,
  tutorial: true,
  introduction: true,
  progress: 9
};

const availableRoutes = [
  '/',
  '/intro',
  '/tutorial',
  '/intro-tdd',
  '/tdd',
  '/tdd-end',
  '/rocket-01',
  '/rocket-02',
  '/rocket-03',
  '/rocket-03-01',
  '/rocket-03-02',
  '/completed',
  '/survey'
];

describe('Auth behavior', () => {

  beforeEach(() => {
    auth.firebaseRef = {
      off: null
    };
  });

  afterEach(() => {
    auth.firebaseRef = {
      off: null
    };
  });

  test('should logout', () => {
    const callback = jest.fn();

    firebase.auth = () => {
      return {
        signOut: callback
      };
    };

    auth.signout();

    expect(callback).toBeCalled();
  });

  test('unsubscribe to prevent event leak', () => {
    const callback = jest.fn();
    auth.firebaseRef = {
      off: callback
    };

    auth.unsubscribe();

    expect(callback).toBeCalled();
  });

  test('prevent to unsubscribe from null firebase reference by default', () => {
    auth.unsubscribe();
    expect(auth.firebaseRef.off).toBe(null);
  });

  test('update user data personal info once logged in', done => {
    auth.userRef = user => {
      return {
        once: (type, data) => {
          data({
            val: () => mockedUserProgress
          });
        }
      };
    };

    firebase.auth = () => {
      return {
        onAuthStateChanged: data => {
          data(mockedUserAuthData);
        }
      };
    };

    auth.authenticate().then(data => {
      expect(data.uid).toEqual(mockedUserAuthData.uid);
      expect(data.name).toEqual(mockedUserAuthData.displayName);
      expect(data.email).toEqual(mockedUserAuthData.email);
      expect(data.photo).toEqual(mockedUserAuthData.photoURL);

      expect(data.level).toEqual(mockedUserProgress.level);
      expect(data.progress).toEqual(mockedUserProgress.progress);
      expect(data.tutorial).toEqual(mockedUserProgress.tutorial);
      expect(data.introduction).toEqual(mockedUserProgress.introduction);
      done();
    });
  });
});

describe('route access and redirection', () => {

  describe.each(availableRoutes)(
    'should redirect unauthenticated user ',
    (route) => {
      test(`trying to access: ${route}`, () => {
        const can = auth.canEnter({}, { pathname: route});

        expect(can.flag).toBeFalsy();
        expect(can.to).toEqual('/');
      });
    },
  );

  test.each(availableRoutes.filter(route => route !== '/intro'))(
    'should keep the user level 1 in the introduction section, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 1 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/intro');
    },
  );

  test.each(availableRoutes.filter(route => route !== '/tutorial'))(
    'should keep the user level 2 in the tutorial section, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 2 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/tutorial');
    },
  );

  test.each(availableRoutes.filter(route => route !== '/tutorial-end'))(
    'should keep the user level 3 in the tutorial end section, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 3 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/tutorial-end');
    },
  );

  test.each(availableRoutes.filter(route => route !== '/tdd-intro'))(
    'should keep the user level 4 in the tdd introduction section, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 4 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/tdd-intro');
    },
  );

  test.each(availableRoutes.filter(route => route !== '/tdd'))(
    'should keep the user level 5 in the tdd introduction section, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 5 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/tdd');
    },
  );

  test.each(availableRoutes.filter(route => route !== '/tdd-end'))(
    'should keep the user level 6 in the tdd introduction section, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 6 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/tdd-end');
    },
  );

  test.each(availableRoutes.filter(route => route !== '/rocket-01'))(
    'should keep the user level 7 in the tdd introduction section, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 7 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/rocket-01');
    },
  );

  test.each(availableRoutes.filter(route => route !== '/rocket-02'))(
    'should keep the user level 8 in the tdd introduction section, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 8 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/rocket-02');
    },
  );

  test.each(availableRoutes.filter(route => route !== '/rocket-03'))(
    'should keep the user level 09 in the tdd introduction section, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 9 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/rocket-03');
    },
  );

  test.each(availableRoutes.filter(route => route !== '/rocket-03-01'))(
    'should keep the user level 10 in the challenge 03 sub challenge 01, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 10 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/rocket-03-01');
    },
  );

  test.each(availableRoutes.filter(route => route !== '/rocket-03-02'))(
    'should keep the user level 11 in the challenge 03 sub challenge 02, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 11 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/rocket-03-02');
    },
  );

  test.each(availableRoutes.filter(route => route !== '/completed'))(
    'should keep the user level 12 in the tdd introduction section, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 12 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/completed');
    },
  );
  test.each(availableRoutes.filter(route => route !== '/survey'))(
    'should keep the user level 13 in the tdd introduction section, trying to access: %s',
    (currentRoute) => {
      const can = auth.canEnter({ uid: 999, level: 13 }, { pathname: currentRoute });

      expect(can.flag).toBeFalsy();
      expect(can.to).toEqual('/survey');
    },
  );

  test.each([
    ['/intro', 1],
    ['/tutorial', 2],
    ['/tutorial-end', 3],
    ['/tdd-intro', 4],
    ['/tdd', 5],
    ['/tdd-end', 6],
    ['/rocket-01', 7],
    ['/rocket-02', 8],
    ['/rocket-03', 9],
    ['/rocket-03-01', 10],
    ['/rocket-03-02', 11],
    ['/completed', 12],
    ['/survey', 13],
  ])(
    'should render the related component  based on the level, trying to access route %s, level %s',
    (currentRoute, level) => {
      const can = auth.canEnter({ uid: 999, level }, { pathname: currentRoute });

      expect(can.flag).toBeTruthy();
    },
  );
});