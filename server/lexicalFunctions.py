from pyinflect import getInflection
from nltk.corpus import wordnet as wn
import spacy
from reverso_context_api import Client
from PyDictionary import PyDictionary

nlp = spacy.load("en_core_web_sm")

def get_meaning(word):
    dictionary = PyDictionary()
    result = dictionary.meaning(word)
    if result == None:
        return {'Oops!':["We don't know what it is..."]}
    for key in result:
        while len(result[key]) > 2:
            result[key].pop()
    return result

def get_normal_form(word):
    doc = nlp(word)
    return doc[0].lemma_

def get_usage(word):
    client = Client("en", "ru")
    result =[]
    count = 0
    for context in client.get_translation_samples(word, cleanup=True):
        result.append(context[0])
        count += 1
        if count > 4:
            break
    return result

if __name__=='__main__':

    # Слово для анализа
    word = "begin"

    # Получение различных форм глагола "begin"
    forms = getInflection(word, tag='VBD')  # Прошедшее время, форма 1
    print(forms)

    forms = getInflection(word, tag='VBG')  # Герундий
    print(forms)

    forms = getInflection(word, tag='VBN')  # Причастие прошедшего времени
    print(forms)

    forms = getInflection(word, tag='VB')  # Базовая форма (инфинитив)
    print(forms)

    forms = getInflection(word, tag='VBP')  # Настоящее время, форма 1
    print(forms)
