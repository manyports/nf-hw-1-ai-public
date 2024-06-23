import { useContext, useEffect, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { ChatContext } from '../context/ChatContext';
import axios from 'axios';

export default function Container() {
    const [prompt, setPrompt] = useState('');
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, prevPrompts, setRecentPrompt, newChat } = useContext(ChatContext);
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        fetchChats();
    }, []);

    const fetchChats = async () => {
        try {
            const response = await axios.get('https://nf-hw-1-ai.onrender.com/getChats');
            const prompts = response.data.filter(chat => chat.type === 'prompt');
            setChatList(prompts);
        } catch (error) {
            console.error('Error fetching chats:', error);
        }
    };

    const handleItemClick = (text) => {
        setInput(text);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSentClick();
        }
    };

    const handleSentClick = () => {
        onSent();
        saveChat(input);
        setInput("");
    };

    const saveChat = async (chat) => {
        try {
            await axios.post('https://nf-hw-1-ai.onrender.com/saveChat', { prompt: chat, type: 'prompt' }); 
            fetchChats(); 
        } catch (error) {
            console.error('Error saving chat:', error);
        }
    };

    return (
        <div className="h-screen flex bg-white text-black font-sans">
            <div className="w-1/5 bg-gray-100 p-4">
                <button className='p-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300 w-full' onClick={() => newChat()}>Create new chat</button>
                <div className="font-semibold text-xl mb-4">Recent prompts</div>
                <ul className="space-y-2">
                    {chatList.map((chat, index) => (
                        <li key={index} className="p-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300" onClick={() => handleItemClick(chat.prompt)}>{chat.prompt}</li>
                    ))}
                </ul>
            </div>
            <div className="w-4/5 flex flex-col justify-between p-4">
                {!showResult ? (
                    <>
                        <div className="flex flex-col">
                            <div className="font-semibold text-2xl mb-4 text-center">
                                What do you want to know about? 💯
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div
                                    className="bg-blue-100 p-4 rounded-lg text-center hover:bg-blue-200 transition-colors cursor-pointer text-[20px] font-bold"
                                    onClick={() => handleItemClick('How to annoy your neighbour')}
                                >
                                    How to annoy <br /> <span className="text-blue-700">your neighbour 😱</span>
                                </div>
                                <div
                                    className="bg-green-100 p-4 rounded-lg text-center hover:bg-green-200 transition-colors cursor-pointer text-[20px] font-bold"
                                    onClick={() => handleItemClick('How to win nFactorial Incubator')}
                                >
                                    How to win <br /> <span className="text-green-700">nFactorial Incubator 🤑</span>
                                </div>
                                <div
                                    className="bg-yellow-100 p-4 rounded-lg text-center hover:bg-yellow-200 transition-colors cursor-pointer text-[20px] font-bold"
                                    onClick={() => handleItemClick('How to make your first cash')}
                                >
                                    How to make <br /> <span className="text-yellow-700">your first cash 🪙</span>
                                </div>
                                <div
                                    className="bg-red-100 p-4 rounded-lg text-center hover:bg-red-200 transition-colors cursor-pointer text-[20px] font-bold"
                                    onClick={() => handleItemClick('How to apologize to your mentor (sincerely)')}
                                >
                                    How to apologize <br /> <span className="text-red-700">to your mentor (sincerely) 📍</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <div>
                                <p className='pb-1'><b>You</b></p>
                                <p>{recentPrompt}</p>
                            </div>
                            <div>
                                <p className='pt-4'><b>AI</b></p>
                                {resultData && (
                                    <p dangerouslySetInnerHTML={{ __html: resultData }} className='w-[60%]' />
                                )}
                            </div>
                        </div>
                    </>
                )}
                <div className="w-full flex items-center justify-center py-4">
                    <input
                        type="text"
                        className="border-none shadow-sm px-4 py-2 w-full bg-gray-100 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                        placeholder="Enter your prompt here"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress} 
                    />
                    <button className="bg-blue-500 text-white p-2 ml-2 rounded-full hover:bg-blue-600 transition-colors" onClick={handleSentClick}>
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
}
