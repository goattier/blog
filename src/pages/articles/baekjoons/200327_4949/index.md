---
title: "[백준] 4949 : 균형잡힌 세상"
date: "2020-03-27"
layout: post
draft: false
path: "/posts/baekjoons/4949/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 4949번 문제 : 균형잡힌 세상"
---

# 4949번 : 균형잡힌 세상

👉 [문제 바로가기](https://www.acmicpc.net/problem/4949)


## 배경 지식
- `스택(Stack)` : 한 쪽 끝에서만 자료를 넣거나 뺄 수 있는 선형 구조(LIFO - Last In First Out)

## 푼 방법
역시 알고리즘 문제를 풀 때 독해력도 중요한 것 같다. 알고보면 매우 간단하고 명료한 문제이지만, 설명을 엄청 풀어쓰고 애매모호하게 써놔서 문제 이해에 시간을 꽤 투자하게 되는 상황이 빈번히 벌어진다.(본인만 그럴수도..)

이번 문제도 stack을 활용하여 푸는 문제이다. **주어진 각각의 문장에서 '()'와 '[]' 의 짝이 맞는지** 즉, **균형을 이루는지** 확인하면 된다.

**'(' & '['** 은 **stack에 push**하고 **')' & ']'** 이면 **stack에서 pop**해서 **짝이 맞는지 확인**한다.

**문장의 끝까지 가서 각각의 짝이 맞고, stack이 비워져 있으면** 그 문장은 **균형을 이룬것**이다; **그 외 나머지 경우는 'no'로 출력**해주면 된다.


## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <string>

template <typename T>
class Stack {
private:
	T *data; // 데이터 배열(arr)
	int capacity; // 스택의 크기
	int top_idx; // 스택 맨 위 인덱스 = 제일 최근 인덱스
	
public:
	//생성자
	Stack(int capacity = 1000) : data(new T[capacity]), capacity(capacity), top_idx(-1) {}
	
	//소멸자
	~Stack() {delete[] data;}
	
	void push(T value) {
		if(!is_full())
			this->data[++(this->top_idx)] = value;
		else
			std::cout << "Stack is full." << std::endl;
	}
	
	T pop() {
		if(this->top_idx != -1)
			return this->data[(this->top_idx)--];
		else
			return this->top_idx; //std::cout << "Stack is empty." << std::endl;
	}
	
	int size() {
		return (this->top_idx)+1;
	}
	
	bool is_empty() {
		return (this->top_idx == -1) ? true : false;
	}
	
	T top() {
		return (this->top_idx == -1) ? -1 : this->data[this->top_idx];
	}
	
	bool is_full() {
		return (this->top_idx == this->capacity) ? true : false;
	}
	
	friend std::ostream& operator <<(std::ostream &out, Stack<T> &stack){
		T *temp = stack.data;
		out << "┌───┐" << std::endl;
		for(int i = stack.top_idx; i >= 0; --i){
			out << "  " << temp[i] << std::endl;
		}
		out << "└───┘" << std::endl;
		return out;
	}
};

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	std::string sentence;
	
	while (1) {
		Stack<char> stack;
		bool is_balanced = true;
		std::getline(std::cin, sentence);
		
		if (sentence == ".") // 입력 종료 조건
			break;
		
		for (int i = 0; i < sentence.size(); ++i) {
			if (sentence[i] == '(' || sentence[i] == '[')
				stack.push(sentence[i]);
			else if (sentence[i] == ')') {
				char ch = stack.pop();
				if (ch != '(')
					is_balanced = false;
			} else if (sentence[i] == ']') {
				char ch = stack.pop();
				if (ch != '[')
					is_balanced = false;
			}
		}
		
		if (stack.is_empty() && is_balanced) // stack is empty && pairs balanced
			std::cout << "yes" << '\n';
		else
			std::cout << "no" << '\n';
	}
	
	return 0;
}
~~~
