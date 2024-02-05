import ShortenIcon from "../images/shorten.svg";
import ExpandIcon from "../images/expand.svg";
import SettingsIcon from "../images/settings.svg"
import QuestionIcon from "../images/question.svg";
import RefactorIcon from "../images/refactor.svg";
import ChatIcon from "../images/chat.svg";
import { getClipboard, setClipboard } from "./clipboard";

import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";
import { notify, notifyAI } from "./notifications";
import { hideWindow } from "./window";
import { view } from "../stores/view";
import { OptionRecord } from "./options";
import { openAIModels } from "../stores/openai";
import { get } from "svelte/store";
import { textInput } from "../stores/textInput";


const shorten = async () => {
    const clipboard = await getClipboard();
    const functionMessages = [
        new SystemMessage("You are text summarizer. You have to summarize given text without any aditional comments. Be as concise as possible. Maintain original language, style and tone of text."),
        new HumanMessage(`text: ###
        Informację o hacku opublikował dotknięty Uniwersytet. Czytamy tutaj:

        w wyniku celowanego ataku hackerskiego na Centrum Przetwarzania Danych Uniwersytetu Zielonogórskiego, przeprowadzonego w nocy z dnia 5 na 6 stycznia 2024 r., zostały zablokowane wszystkie serwisy działające w środowisku wirtualizacji utrzymywanym w Centrum Komputerowym Uniwersytetu Zielonogórskiego.

        Nie działają takie systemy jak:

        Poczta UZ (planowany czas przywrócenia usłuusługigi: 10.01.2024 r.).
        System Centralnego Druku.
        System pobierania kluczy z depozytora – dotyczy pobierania kluczy do sal wykładowych.
        Systemy biblioteczne uczelni.
        Uniwersytet dodaje, że zajęcia odbywają się bez zmian.

        Całość wygląda jak atak ransomware, o co zapytamy – po przywróceniu do działania uczelnianej poczty elektronicznej.

        ~ms
        ###`),
        new AIMessage("Uniwersytet Zielonogórski padł ofiarą celowanego ataku hackerskiego, który zablokował serwisy wirtualizacji, w tym Pocztę UZ i inne systemy. Przywrócenie usług planowane jest na 10.01.2024 r. Atak przypomina ransomware. Zajęcia na uniwersytecie odbywają się normalnie. Pytania w sprawie ataku będą kierowane po przywróceniu poczty elektronicznej."),
        new HumanMessage(`text ### ${clipboard} ###`)
    ];
    hideWindow();
    try {

        const response = await get(openAIModels).gpt35.invoke(functionMessages);
        // notifyAI("Text summary is ready!");
        notify("Your text summary is ready!");
        setClipboard(response.content.toString());
    } catch (error) {
        notify("Your text summary finished with error.");

    }
};

const ask = async () => {
    const clipboard = await getClipboard();
    const functionMessages = [
        new SystemMessage("You are helpful assistant. Be as concise as possible. Answer in the same language as question. If necesary generate code snippets."),
        new HumanMessage(`${clipboard}`)
    ];
    hideWindow()
    try {
        const response = await get(openAIModels).gpt35.invoke(functionMessages);
        // notifyAI("Text summary is ready.");
        notify("Your answer is ready!");
        setClipboard(response.content.toString());
    } catch (error) {
        notify("Your answer finished with error.");
    }
};

const refactor = async () => {
    const clipboard = await getClipboard();
    const functionMessages = [
        new SystemMessage("Refactor given code. Obey rules:\n- Skip any aditional comments\n- Retrun only refactored code\n- It's forbidden to use markdown.\n- Don't use code blocks\n- If possible add error handling"),
        new HumanMessage(`${clipboard}`)
    ];
    hideWindow();

    try {
        const response = await get(openAIModels).gpt35.invoke(functionMessages);
        // notifyAI("Text summary is ready.");

        notify("Your refactor is ready!");
        setClipboard(response.content.toString());
    } catch (error) {
        notify("Your refactor finished with error.");
    }
};

export const commandPaletteOptions = [
    new OptionRecord({
        name: "Chat",
        description: "Chat with Lily",
        icon: ChatIcon,
        callback: view.switchToChat
    }),
    new OptionRecord({
        name: "Ask",
        description: "Ask simple questions",
        icon: QuestionIcon,
        callback: ask
    }),
    new OptionRecord({
        name: "Shorten",
        description: "Summary of the text",
        icon: ShortenIcon,
        callback: shorten
    }),
    new OptionRecord({
        name: "Refactor code",
        description: "Tidy up & refactor code",
        icon: RefactorIcon,
        callback: refactor
    }),
    new OptionRecord({
        name: "Settings",
        description: "Configuration of assistant",
        icon: SettingsIcon,
        callback: () => {
            view.switchToSettings();-
            textInput.reset();
        }
    })
];
