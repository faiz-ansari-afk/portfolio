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

  const options = { year: "numeric", month: "short" };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}


// export function getIconFromName(name:string): React.ReactElement | null{
//   const iconName = name.toLowerCase();
//   switch(iconName){
//     case 'nextjs':
//       return <Nextjs />
//       break;
//     case 'strapi':
//       return <Strapi />
//       break;
//   }
// }