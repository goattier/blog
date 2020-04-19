---
title: "[백준] 10828 : 스택"
date: "2020-03-24"
layout: post
draft: false
path: "/posts/baekjoons/10828/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 10828번 문제 : 스택"
---

# 10828번 : 스택

👉 [문제 바로가기](https://www.acmicpc.net/problem/10828)



## 배경 지식
- `스택(Stack)` : 한 쪽 끝에서만 자료를 넣거나 뺄 수 있는 선형 구조(LIFO - Last In First Out)

## 푼 방법
스택의 개념과 구현 방법을 알고 있다면 배열 혹은 링크드리스트를 이용해서 쉽게 풀 수 있는 문제이다. (나는 배열을 이용해서 풀었다.)

추후에 '자료구조' 섹션에서 '스택'에 대해 자세히 다룰 예정이다.


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
};


int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n;
	std::string op;
	Stack<int> stack;
	
	std::cin >> n;
	
	for (int i = 0; i < n; ++i) {
		std::cin >> op;
		
		if (op == "push") {
			int value;
			std::cin >> value;
			stack.push(value);
		}
		else if (op == "pop")
			std::cout << stack.pop() << '\n';
		else if (op == "size")
			std::cout << stack.size() << '\n';
		else if (op == "empty")
			std::cout << stack.is_empty() << '\n';
		else if (op == "top")
			std::cout << stack.top() << '\n';
	}
    
    return 0;
}
~~~

### References
https://dpdpwl.tistory.com/68  
http://blog.naver.com/PostView.nhn?blogId=tipsware&logNo=221212462913&categoryNo=88&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=search  
https://blockdmask.tistory.com/45  
https://modoocode.com/219  
