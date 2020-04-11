---
title: "[백준] 1021 : 회전하는 큐"
date: "2020-04-11"
layout: post
draft: false
path: "/posts/baekjoons/1021/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1021번 문제 : 회전하는 큐"
---

# 1021번 : 회전하는 큐

👉 [문제 바로가기](https://www.acmicpc.net/problem/1021)


## 배경 지식
- `덱(Deque)` : **양쪽 끝**에서 삽입과 삭제가 모두 가능한 자료 구조

## 푼 방법
이 문제는 덱(deque)을 활용하여 쉽게 풀 수 있다.

덱(deque)에 숫자 원소를 1부터 n까지 순서대로 push하고, 뽑기를 원하는 숫자 원소가 덱(deque)의 맨 앞에 위치하도록 왼쪽 혹은 오른쪽으로 모든 원소들을 이동시킨다.

왼쪽 혹은 오른쪽으로 원소들을 옮김에 있어 중요한 것은 **최소한의 연산 횟수**으로 움직여 **뽑기를 원하는 원소가 덱(deque)의 맨 앞에 위치해야 한다**는 것이다. 즉, **뽑기를 원하는 원소의 index를 파악**하고, 왼쪽과 오른쪽으로 움직였을 때 **어느 쪽으로 옮겨야 더 최소한의 연산으로 움직일지 파악**하고 이동시켜야 한다.

그렇게 뽑기를 원하는 원소들을 다 뽑을 때까지 연산 횟수를 세고, 다 뽑은 후 최소 연산 횟수을 출력한다.


## 내 정답 코드 (C++)

~~~c
#include <iostream>

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
	
	int find_index(T data) {
		int idx = 0;
		Node<T> *cur = this->head;
		
		while (cur != nullptr) {
			if (cur->data == data)
				break;
			else {
				cur = cur->rear;
				++idx;
			}
		}
		
		return idx;
	}
	
	T get_head() {
		if (is_empty()) // empty deque.
			return -1; // T type에 맞는 error code return.
		else
			return this->head->data;
	}
	
	T get_tail() {
		if (is_empty()) // empty deque.
			return -1; // T type에 맞는 error code return.
		else
			return this->tail->data;
	}
};

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	Deque<int> deque;
	int n, m, draw_num[50], cnt = 0;
	
	std::cin >> n >> m;
	
	for (int i = 1; i <= n; ++i)
		deque.push_back(i);
		
	for (int i = 0; i < m; ++i)
		std::cin >> draw_num[i];

	for (int i = 0; i < m; ++i) {
		while(deque.get_head() != draw_num[i]) {
			int idx = deque.find_index(draw_num[i]);
			
			if (n-idx < idx) { // 뒷쪽에 있음
				deque.push_front(deque.pop_back());
				idx = (idx + 1) % n;
			}
			else {
				deque.push_back(deque.pop_front());
				idx = (idx - 1 + n) % n;
			}
				
			++cnt;
		}
		
		deque.pop_front();
		n -= 1;
	}
	
	std::cout << cnt << std::endl;
	
	return 0;
}
~~~