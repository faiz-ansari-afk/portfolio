import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertFirebaseTimestampToJSDate(firebaseTimestamp:{
  seconds: number;
  nanoseconds: number;
}) {
  const { seconds, nanoseconds } = firebaseTimestamp;
  const milliseconds = seconds * 1000 + nanoseconds / 1e6;
  const date = new Date(milliseconds);

  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

