export default function Header(){
    return(
        <div className="bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
           <div className="flex py-5 items-center justify-between">
                <div className="font-bold text-[20px] mx-5">
                    AI Chatbot
                </div>
                <div className="flex text-[18px]">
                    <a className="mx-5" href="/">Chats</a>
                </div>
            </div> 
        </div>
    )
}