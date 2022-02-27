export default {
  global: {
    options: 'Options',
  },
  menu: {
    logout: 'logout'
  },
  achievements: {
    title: 'Achievements',
    empty_list: 'There is no achievement to show up',
    social_sharing: 'Achievement unlocked!',
    list: [
      {
        title: 'Challenge accepted',
        description: 'Let\'s build a rocket!',
        level: 2,
        active: false
      },
      {
        title: 'Tutorial completed',
        description: 'Sum function created successfully!',
        level: 3,
        active: false
      },
      {
        title: 'Test after making code',
        level: 4,
        description: 'Do not leave everything in one function',
        active: false
      },
      {
        title: 'Unit test',
        level: 5,
        description: 'Prevents possible unwanted changes and tests small units of code as functions',
        items: [
          'Store the running code result',
          'Store expected result in a variable',
          'Compare the two results'
        ],
        active: false
      },
      {
        title: 'Unit test - All set to build the rocket!',
        level: 6,
        description: 'Sum function successfully tested!',
        active: false
      },
      {
        title: 'Unit test - Two engines running',
        level: 8,
        description: 'Successful engine multiplication, two instead of one.',
        active: false
      },
      {
        title: 'Unit test - Landing lock',
        level: 9,
        description: 'Built-in landing system, lock removed!',
        active: false
      },
      {
        title: 'Unit test - Ready and tested localization system',
        level: 12,
        description: 'Two functioning and tested GPS systems.',
        active: false
      },
    ]
  },
  level : {
    label: 'level'
  },
  ranking: {
    title: 'ranking',
    error: 'Something went wrong loading the ranking :(',
    table: {
      position: 'position',
      name: 'name',
      level: 'level',
    }
  },
  options: {
    language: 'Language',
    background_animation: 'Background animation',
    languages : {
      en: 'English',
      es: 'Spanish',
      'pt-br': 'Portuguese (Brazil)',
      ro: 'Romanian'
    }
  },
  survey: {
    title: 'Survey'
  },
  content: {
    introduction: {
      what_is_the_first: 'What is the first?',
      hello_world: '_ Hello world',
      open_curly_brackets: '{',
      my_name_is_buggy: 'My name is Buggy',
      my_dream: 'and my dream is to become a programmer',
      two_challenges: 'though, I have two big challenges',
      close_curly_brackets: '}',
    }
  }
};