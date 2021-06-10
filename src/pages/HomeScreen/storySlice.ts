import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../config/store/store';

export interface StoryState {
  title: string;
}

const initialState: StoryState = {
  title: 'sample title',
};

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    setStory: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});

export const {setStory} = storySlice.actions;

export const selectTitle = (state: RootState) => state.story.title;

export default storySlice.reducer;
