---
title: "[백준] 2164 : 카드2"
date: "2020-03-31"
layout: post
draft: false
path: "/posts/baekjoons/2164/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 2164번 문제 : 카드2"
---

# 2164번 : 카드2

👉 [문제 바로가기](https://www.acmicpc.net/problem/2164)


## 배경 지식
- `큐(Queue)` : 먼저 집어 넣은 데이터가 먼저 나오는 **FIFO(First In First Oout)구조**로 데이터를 저장하는 자료 구조

## 푼 방법
**1 ~ n까지의 수를 먼저 queue에 en_queue**한 후, **de_queue하면서 버리고 다시 en_queue하기를 queue에 1개의 data node만 남을 때까지 반복**한다. 그리고 마지막 data node의 data를 출력한다.



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
class Queue {
private:
	Node<T> *head;
	Node<T> *tail;
	int size;
	
public:
	Queue() : head(nullptr), tail(nullptr) , size(0) {}
	~Queue() {
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
	
	void en_queue(T value) {
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
	
	T de_queue() {
		if (is_empty()) // empty queue
			return -1; // T type에 맞는 error code return.
		else {
			int pop_val = this->head->data;
			
			if (this->head == this->tail) { // queue with 1 element.
				delete this->head;
				this->head = this->tail = nullptr;
			}
			else { // queue with more than 2 elements.
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
};

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	Queue<int> queue;
	int n;
	bool discarded = false;
	
	std::cin >> n;
	
	for (int i = 1; i <= n; ++i)
		queue.en_queue(i);
	
	while(queue.get_size() != 1) {
		if (discarded) { // 바닥에 옮기기
			queue.en_queue(queue.de_queue());
			discarded = false;
		} 
		else { // 바닥에 버리기
			queue.de_queue();
			discarded = true;
		}
	}

	std::cout << queue.de_queue() << std::endl;
	
	return 0;
}
~~~