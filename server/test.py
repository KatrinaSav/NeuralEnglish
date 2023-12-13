import spacy
from spacy import tokens
from pyinflect import getInflection
import re
from pydantic import BaseModel
from typing import Union

from db_request import db_get_article_page_count, db_get_article


class Question(BaseModel):
    text: Union[str, None] = None
    questions: list[str] = []
    answer: Union[str, None] = None


def create_test(id):
    # result = Question()
    result = []
    page_count = db_get_article_page_count(id)
    print(page_count)
    if not page_count:
        return []
    if page_count[0][0] > 11:
        page_count = 11
    else:
        page_count = page_count[0][0]
    for i in range(1, page_count):
        text = db_get_article(id, i)[0][0]
        sentences = re.split(r'[.]{1,3}|[!?]', text)
        sentence_num = 0
        question = create_question(sentences[sentence_num])
        print(question)
        while not question.questions:
                try:
                    sentence_num = sentence_num + 1
                    question = create_question(sentences[sentence_num])
                except:
                    break
        result.append(question)
    # print(result)
    return result
    # sentences = re.split(r'[.]{1,3}|[!?]', text)
    # print(sentences)

    # for sentence in sentences:
    #     if sentence != '':
    #         print(sentence)
    # print(create_question('Have you ever been to a concert'))


def create_question(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    verb = ''
    result = Question()
    for token in doc:
        if (verb != ''):
            break
        if "VERB" in token.pos_:
            index_to_delete = [token.i]
            for i in token.children:
                if 'AUX' in i.pos_:
                    index_to_delete.append(i.i)
                    verb = verb + " " + i.text
            verb = verb + ' ' + token.text
            new_tokens = [token.text if i not in index_to_delete
                          else '__' for i, token in enumerate(doc)]
            new_doc = spacy.tokens.Doc(nlp.vocab, words=[token for token in new_tokens])
            new_doc_processed = nlp.get_pipe("tagger")(new_doc)
            result.text = new_doc_processed.text
            create_options(verb, token, result)
            return result
    return result


def create_options(word, token, result: Question):
    past_continuous_pattern = re.compile(r'\b(?:was|were)\b', re.IGNORECASE)
    past_perfect_pattern = re.compile(r'\b(had)\b', re.IGNORECASE)
    past_perfect_continuous_pattern = re.compile(r'\bhad\sbeen\b', re.IGNORECASE)

    present_tense_pattern = re.compile(r'\b(?:am|is|are|\w+s)\b', re.IGNORECASE)
    present_continuous_pattern = re.compile(r'\b(?:am|is|are)\b', re.IGNORECASE)
    present_perfect_pattern = re.compile(r'\b(?:have|has)\b', re.IGNORECASE)
    present_perfect_continuous_pattern = re.compile(r'\b(?:have\sbeen|hass\sbeen)\b', re.IGNORECASE)

    future_tense_pattern = re.compile(r'\b(?:will\s+\w+|\w+\'ll)\b', re.IGNORECASE)
    future_continuous_pattern = re.compile(r'\b(will\sbe)\b', re.IGNORECASE)
    future_perfect_pattern = re.compile(r'\b(will\shave)\b', re.IGNORECASE)
    future_perfect_continuous_pattern = re.compile(r'\b(will\shave\sbeen)\b', re.IGNORECASE)

    if token.tag_ == 'VB':
        if re.search(future_tense_pattern, word):
            result.questions.append(word.strip())
            result.answer = word.strip()
            for answer in create_future_forms(token.lemma_, 'FS'):
                result.questions.append(answer)
        elif re.search(present_tense_pattern, word):
            result.answer = word.strip()
            result.questions.append(word.strip())
            for answer in create_present_forms(token.lemma_, 'PRS', define_pov(word, token)):
                result.questions.append(answer)

    elif token.tag_ == 'VBD':
        result.answer = word.strip()
        result.questions.append(word.strip())
        for answer in create_past_forms(token.lemma_, 'PAS'):
            result.questions.append(answer)

    elif token.tag_ == 'VBG':
        if re.search(present_continuous_pattern, word):
            result.answer = word.strip()
            result.questions.append(word.strip())
            for answer in create_present_forms(token.lemma_, 'PRC', define_pov(word, token)):
                result.questions.append(answer)
        elif re.search(past_continuous_pattern, word):
            result.answer = word.strip()
            result.questions.append(word.strip())
            for answer in create_past_forms(token.lemma_, 'PAC', define_pov(word, token)):
                result.questions.append(answer)
        elif re.search(future_continuous_pattern, word):
            result.answer = word.strip()
            result.questions.append(word.strip())
            for answer in create_future_forms(token.lemma_, 'FC'):
                result.questions.append(answer)
        elif re.search(present_perfect_continuous_pattern, word):
            result.answer = word.strip()
            result.questions.append(word.strip())
            for answer in create_present_forms(token.lemma_, 'PRPC', define_pov(word, token)):
                result.questions.append(answer)
        elif re.search(past_perfect_continuous_pattern, word):
            result.answer = word.strip()
            result.questions.append(word.strip())
            for answer in create_past_forms(token.lemma_, 'PAPC'):
                result.questions.append(answer)
        elif re.search(future_perfect_continuous_pattern, word):
            result.answer = word.strip()
            result.questions.append(word.strip())
            for answer in create_future_forms(token.lemma_, 'FPC'):
                result.questions.append(answer)

    elif token.tag_ == 'VBN':
        if re.search(future_perfect_pattern, word):
            result.answer = word.strip()
            result.questions.append(word.strip())
            for answer in create_future_forms(token.lemma_, 'FP'):
                result.questions.append(answer)
        elif re.search(past_perfect_pattern, word):
            result.answer = word.strip()
            result.questions.append(word.strip())
            for answer in create_past_forms(token.lemma_, 'PAP'):
                result.questions.append(answer)
        elif re.search(present_perfect_pattern, word):
            result.answer = word.strip()
            result.questions.append(word.strip())
            for answer in create_present_forms(token.lemma_, 'PRP', define_pov(word, token)):
                result.questions.append(answer)
    elif token.tag_ == 'VBP':
        result.answer = word.strip()
        result.questions.append(word.strip())
        for answer in create_present_forms(token.lemma_, 'PRS', define_pov(word, token)):
            result.questions.append(answer)
    elif token.tag_ == 'VBZ':
        result.answer = word.strip()
        result.questions.append(word.strip())
        for answer in create_present_forms(token.lemma_, 'PRS', define_pov(word, token)):
            result.questions.append(answer)
    return result


def define_pov(word, token):
    first = re.compile(r'\b(?:am|have|was)\b', re.IGNORECASE)
    second = re.compile(r'\b(?:is|has|was)\b', re.IGNORECASE)
    third = re.compile(r'\b(?:are|have|were)\b', re.IGNORECASE)
    if token.tag_ == 'VBP':
        return 3
    elif token.tag_ == 'VBZ':
        return 2
    if re.search(third, word):
        return 3
    elif re.search(second, word):
        return 2
    elif re.search(first, word):
        return 1


def create_present_forms(word, tense, pov=2):
    aux_continuous = {1: 'am ', 2: 'is ', 3: 'are '}
    aux_perfect = {1: 'have ', 2: 'has ', 3: 'have '}
    result = []
    if tense != 'PRS':
        if pov != 2:
            present_simple = getInflection(word, tag='VBP')[0]
        else:
            present_simple = getInflection(word, tag='VBZ')[0]
        result.append(present_simple)
    if tense != 'PRC':
        present_continuous = aux_continuous[pov] + getInflection(word, tag='VBG')[0]
        result.append(present_continuous)
    if tense != 'PRP':
        present_perfect = aux_perfect[pov] + getInflection(word, tag='VBG')[0]
        result.append(present_perfect)
    if tense != 'PRPC':
        present_perfect_continuous = aux_perfect[pov] + 'been ' + getInflection(word, tag='VBG')[0] #
        result.append(present_perfect_continuous)
    return result


def create_past_forms(word, tense, pov=2):
    aux_continuous = {1: 'was ', 2: 'was ', 3: 'were '}
    result = []
    if tense != 'PAS':
        past_simple = getInflection(word, tag='VBD')[0]
        result.append(past_simple)
    if tense != 'PAC':
        past_continuous = aux_continuous[pov] + getInflection(word, tag='VBG')[0]
        result.append(past_continuous)
    if tense != 'PAP':
        past_perfect = 'had ' + getInflection(word, tag='VBN')[0]
        result.append(past_perfect)
    if tense != 'PAPC':
        past_perfect_continuos = 'had been ' + getInflection(word, tag='VBG')[0]
        result.append(past_perfect_continuos)
    return result


def create_future_forms(word, tense):
    result = []
    if tense != 'FS':
        future_simple = 'will ' + getInflection(word, tag='VB')[0]
        result.append(future_simple)
    if tense != 'FC':
        future_continuous = 'will be ' + getInflection(word, tag='VBG')[0]
        result.append(future_continuous)
    if tense != 'FP':
        future_perfect = 'will have ' + getInflection(word, tag='VBN')[0]
        result.append(future_perfect)
    if tense != 'FPC':
        future_perfect_continuous = 'will have been ' + getInflection(word, tag='VBG')[0]
        result.append(future_perfect_continuous)
    return result


if __name__ == '__main__':
    text3 = '''
She reads a book every evening.
They play soccer on weekends.
He speaks three languages fluently.
I am studying for my exams right now.
They are watching a movie at the moment.
She is cooking dinner for the family.
She visited her grandparents last summer.
They finished their project yesterday.
He lived in London for five years.
I was working when he called.
They were playing tennis when it started raining.
She was reading a book while waiting at the doctor's office.
I will visit Paris next year.
They will start a new business soon.
She will meet her friends at the park.
I will be studying all day tomorrow.
They will be traveling to New York next month.
She will be cooking dinner when we arrive.
I have already finished my homework.
They have seen that movie before.
She has visited Italy multiple times.
I had already left when you called.
They had completed the assignment before the deadline.
She had already eaten lunch when we arrived.
I will have graduated by this time next year.
They will have finished the construction by the end of the week.
She will have cooked dinner before the guests arrive.
She has been studying for her exams all week.
They had been working on the project for several months before it was completed.
I will have been waiting for two hours.
I have visited Paris several times.
They have never tried sushi before.
She has lived in London for five years.
We have just finished watching the movie.
Have you ever been to a concert?
The team has won the championship for the third consecutive year.
He has studied Spanish since high school.
My sister has already eaten lunch.
'''
    text2 = 'There are many reasons a Doctor may want to learn to code.'
    text1 = '''I have visited Paris several times.
They have never tried sushi before.
She has lived in London for five years.
We have just finished watching the movie.
Have you ever been to a concert?
The team has won the championship for the third consecutive year.
He has studied Spanish since high school.
My sister has already eaten lunch.'''
    create_test(3)
    # print((create_question(text3)))