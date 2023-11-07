from pyinflect import getInflection
from nltk.corpus import wordnet as wn
import spacy
from reverso_context_api import Client
from PyDictionary import PyDictionary

nlp = spacy.load("en_core_web_sm")

if __name__=='__main__':

    client = Client("en", "ru")
    count = 0
    for context in client.get_translation_samples("begun", cleanup=True):
        print(context[0])
        count+=1
        if count>10:
            break

    dictionary = PyDictionary()
    print(dictionary.meaning("dwarf"))
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
    print(wn.synset('dwarf.n.01').definition())
    for e in wn.synset('camping.n.01').examples():
        print(e)
    doc = nlp('prayed')

    for token in doc:
        print(token.text, token.pos_)