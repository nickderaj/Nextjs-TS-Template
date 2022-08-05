import { IFriend } from '@/db/friendsModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Global state to control the selected friend (for editing) and the list rendered
export interface IFriendSliceState {
  selectedFriend: IFriend | null;
  friendList: IFriend[];
  currentLimit: number;
  numAllFriends: number;
}

const initialState: IFriendSliceState = {
  selectedFriend: null,
  friendList: [],
  currentLimit: 12,
  numAllFriends: 0,
};

export const friendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    setSelectedFriend: (state, action: PayloadAction<IFriend>) => {
      state.selectedFriend = action.payload;
    },

    clearSelectedFriend: (state) => {
      state.selectedFriend = null;
    },
    setCurrentLimit: (state, action: PayloadAction<number>) => {
      state.currentLimit = action.payload;
    },
    setNumAllFriends: (state, action: PayloadAction<number>) => {
      state.numAllFriends = action.payload;
    },
    setFriendList: (state, action: PayloadAction<IFriend[]>) => {
      state.friendList = action.payload;
    },
  },
});

export const { setSelectedFriend, clearSelectedFriend, setCurrentLimit, setNumAllFriends, setFriendList } = friendSlice.actions;

export default friendSlice.reducer;
