import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { activeKeys } from '../../const';
import { TInput } from '../../types';

type TProps = {
  footswitchInput: TInput;
  currentSong: number;
  totalSongs: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  songPages: number;
  hasTimer: boolean;
  timerHalted: boolean;
  setTimerHalted: Dispatch<SetStateAction<boolean>>;
  Navigate: ReturnType<typeof useNavigate>;
};

// This component returns null. It is only responsible for handling user commands

export const HandleFootswitch: React.FC<TProps> = ({
  footswitchInput,
  currentSong,
  totalSongs,
  currentPage,
  setCurrentPage,
  hasTimer,
  timerHalted,
  setTimerHalted,
  songPages,
  Navigate,
}) => {
  // TITLE PAGE

  if (footswitchInput && !activeKeys.includes(footswitchInput)) return null;

  const isLastSong = currentSong === totalSongs - 1;
  const isLastPage = currentPage === songPages;

  if (!currentPage) {
    console.log('title page');
    switch (footswitchInput) {
      case activeKeys[0]:
        // Handle left short press
        // go to previous song
        Navigate(`/song/${Math.max(currentSong - 1, 0)}`);
        return null;
      case activeKeys[1]:
        // Handle centre short press
        // TODO: add navigate back to setlist
        return null;
      case activeKeys[2]:
        // Handle right short press
        // go to next page
        setCurrentPage(currentPage + 1);
        return null;
      case activeKeys[5]:
        // Handle right long press
        // go to next song or repertoire if at end of setlist
        if (isLastSong) {
          Navigate('/repertoire');
        } else {
          setCurrentPage(0);
          Navigate(`/song/${currentSong + 1}`);
        }
        return null;
      default:
        return null;
    }
  }
  // LYRIC PAGE
  if (!isLastPage && currentPage) {
    console.log('lyric page');
    switch (footswitchInput) {
      case activeKeys[0]:
        // Handle left short press
        // go to previous page in song
        setCurrentPage(currentPage - 1);
        return null;
      case activeKeys[1]:
        // Handle centre short press
        // toggle timer freeze
        if (hasTimer) {
          setTimerHalted(!timerHalted);
        } else {
          setTimerHalted(false);
        }
        return null;
      case activeKeys[2]:
        // Handle right short press
        // go to next page in song
        setCurrentPage(currentPage + 1);
        return null;
      case activeKeys[3]:
        // Handle left long press
        // go to start of song
        setCurrentPage(0);
        return null;
      case activeKeys[5]:
        // Handle right long press
        // go to next song or repertoire if at end of setlist
        if (isLastSong) {
          Navigate('/repertoire');
        } else {
          setCurrentPage(0);
          Navigate(`/song/${currentSong + 1}`);
        }
        return null;
      default:
        return null;
    }
  }
  // LAST PAGE
  if (currentPage === songPages) {
    console.log('last page');
    switch (footswitchInput) {
      case activeKeys[0]:
        // Handle left short press
        // go to previous page in song
        setCurrentPage(currentPage - 1);
        return null;

      case activeKeys[1]:
        // Handle centre short press
        // toggle timer freeze
        if (hasTimer) {
          setTimerHalted(!timerHalted);
        } else {
          setTimerHalted(false);
        }
        return null;
      case activeKeys[2]:
        // Handle right short press
        // go to next song or repertoire if at end of setlist
        if (isLastSong) {
          Navigate('/repertoire');
        } else {
          setCurrentPage(0);
          Navigate(`/song/${currentSong + 1}`);
        }
        return null;
      case activeKeys[3]:
        // Handle left long press
        // go to start of song
        setCurrentPage(0);
        return null;
      default:
        return null;
    }
  }
};
