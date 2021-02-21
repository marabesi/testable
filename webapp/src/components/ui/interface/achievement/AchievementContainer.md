# AchievementContainer

The AchievementContainer component renders a list of achievements based on the achievements state.
Currently the achievement list is based on a json file (achievements-content.json).

## Basic usage

```jsx
import AchievementContainer from './AchievementContainer';

<div className="bg-black">
  <AchievementContainer 
    intl={{
      messages: {
        achievements: {
          list: []
        }
      }
    }}
    onClose={() => alert('onClose trigged!!!')}
  />
</div>
```
