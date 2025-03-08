import Messages from '@/components/messages';
import {unstable_noStore} from "next/cache";
import {getMessages} from "@/lib/messages";

// 동일한 결과를 얻을 수 있음
// export const revalidate = 5;

// cache : no-store 랑 같음
//export const dynamic = 'force-dynamic';


export default async function MessagesPage() {
  // 특정 컴포넌트에만 캐싱처리를 원하지 않을때의 권장사항
  //unstable_noStore();

  // layout에 있는 요청과 일치하는 요청이라 캐싱처리됨.
  // 새로고침 혹은 다른페이지를 다녀와도 응답데이터가 next.js 서버측에 캐싱되기 때문에 요청 안 함.
  // 따라서 캐싱처리 되지 않고 매번 새로운 데이터를 받아오고 싶다면 revalidtePath 혹은 밑에처럼 cache 를 no-store 로 설정해야함.
  // const response = await fetch('http://localhost:8080/messages', {
  //   cache: 'no-store'
  // });

  // 아래의 구문처럼 5초동안만 캐싱된 데이터를 사용하고 이후엔 새로운 데이터를 받아와라 라고 할 수 있음.
  // const response = await fetch('http://localhost:8080/messages', {
  //   next : {
  //     revalidate: 5
  //   }
  // });

  // const messages = await response.json();

  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
