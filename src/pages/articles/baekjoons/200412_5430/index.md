---
title: "[백준] 5430 : AC"
date: "2020-04-12"
layout: post
draft: false
path: "/posts/baekjoons/5430/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 5430번 문제 : AC"
---

# 5430번 : AC

👉 [문제 바로가기](https://www.acmicpc.net/problem/5430)


## 배경 지식
- `덱(Deque)` : **양쪽 끝**에서 삽입과 삭제가 모두 가능한 자료 구조

## 푼 방법
R 함수와 D 함수를 입력 받은 순서 대로 진행해주고 나머지 원소들을 출력해주면 된다. 

여기서 중요한 포인트는 **R 함수를 실행할 때 모든 원소의 순서를 뒤집으면 안된다.** n이 커지고 R 함수가 많을수록 시간복잡도가 늘어나 time out(시간 초과) 날 수 있다. 

그러면 어떻게 이 문제를 해결해야 할까? **덱(deque)을 사용, R 함수를 실행할 때마다 flag 변수로 앞에서 삭제할지, 뒤에서 삭제할지 결정한다.** **배열을 뒤집는 것은 배열의 뒷 부분을 앞으로 보는 것과 같기 때문에** 덱(deque)의 특징이자 장점을 이용하여 앞, 뒤에서 자유롭게 원소를 삭제해나가면 된다.


## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <string>
#include <sstream>

template <typename T>
struct Node {
	T data;
	struct Node *front;
	struct Node *rear;
};

template <typename T>
class Deque {
private:
	Node<T> *head;
	Node<T> *tail;
	int size;
	
public:
	Deque() : head(nullptr), tail(nullptr), size(0) {}
	~Deque() {
		if (this->head == nullptr)
			return;
		
		Node<T> *cur = this->tail;
		
		while (cur != nullptr) {
			cur = cur->front;
			delete this->tail;
			this->tail = cur;
		}
		
		this->head = this->tail;
	}
	
	int get_size() {
		return this->size;
	}
	
	bool is_empty() {
		return this->head == nullptr ? true : false;
	}
	
	void push_front(T value) {
		Node<T> *node = new Node<T>;
		node->data = value;
		node->front = nullptr;
		node->rear = nullptr;
		
		if (is_empty()) // first push.
			this->tail = node;
		else {
			node->rear = this->head;
			this->head->front = node;
		}
		
		this->head = node;
		++size;
	}
	
	void push_back(T value) {
		Node<T> *node = new Node<T>;
		node->data = value;
		node->front = nullptr;
		node->rear = nullptr;
		
		if (is_empty()) // first push.
			this->head = node;
		else {
			node->front = this->tail;
			this->tail->rear = node;
		}
		
		this->tail = node;
		++size;
	}
	
	T pop_front() {
		if (is_empty()) // empty deque.
			return -1; // T type에 맞는 error code return.
		else {
			int pop_val = this->head->data;
			
			if (this->head == this->tail) { // deque with 1 element.
				delete this->head;
				this->head = this->tail = nullptr;
			}
			else { // deque with more than 2 elements.
				Node<T> *node = new Node<T>;
				
				node = this->head->rear;
				
				delete this->head;
				
				this->head = node;
				this->head->front = nullptr;
			}
			
			--size;
			return pop_val;
		}
	}
	
	T pop_back() {
		if (is_empty()) // empty deque.
			return -1; // T type에 맞는 error code return.
		else {
			int pop_val = this->tail->data;
			
			if (this->head == this->tail) { // deque with 1 element.
				delete this->head;
				this->head = this->tail = nullptr;
			}
			else { // deque with more than 2 elements.
				Node<T> *node = new Node<T>;
				
				node = this->tail->front;
				
				delete this->tail;
				
				this->tail = node;
				this->tail->rear = nullptr;
			}
			
			--size;
			return pop_val;
		}
	}
};

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	bool from_front, error;
	Deque<int> deque;
	int T, n;
	std::string p, num_arr;

	std::cin >> T;
	
	for (int i = 0; i < T; ++i) {
		from_front = true, error = false;
		std::cin >> p;
		std::cin >> n;
		std::cin >> num_arr;
		
		num_arr = num_arr.substr(1); // '[' 제거
		num_arr = num_arr.substr(0, num_arr.size() - 1); // ']' 제거
		
		if (n > 0) {
			std::string token;
			std::stringstream ss(num_arr);
			
			while (std::getline(ss, token, ','))
				deque.push_back(atoi(token.c_str()));
		}
		
		// R 함수 && D 함수 진행
		for (int j = 0; j < p.size(); ++j) {
			if (p[j] == 'R') {
				from_front = !from_front;
			}
			else if (p[j] == 'D') {
				if (from_front) {
					if (deque.pop_front() == -1)
						error = true;
				}
				else {
					if(deque.pop_back() == -1)
						error = true;
				}
			}
		}
		
		// 결과 출력
		if (error)
			std::cout << "error" << '\n';
		else {
			if (deque.is_empty())
				std::cout << "[]" << '\n';
			else {
				std::cout << "[";
				
				if (from_front) {
					while (deque.get_size() >= 2)
						std::cout << deque.pop_front() << ",";
					std::cout << deque.pop_front() << "]\n";
				}
				else {
					while (deque.get_size() >= 2)
						std::cout << deque.pop_back() << ",";
					std::cout << deque.pop_back() << "]\n";
				}
			}
		}
	}
	
	return 0;
}
~~~

### References
https://psychoria.tistory.com/666  
https://geekhub.tistory.com/63
