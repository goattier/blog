---
title: "[백준] 11866 : 요세푸스 문제 0"
date: "2020-04-01"
layout: post
draft: false
path: "/posts/baekjoons/11866/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 11866번 문제 : 요세푸스 문제 0"
---

# 11866번 : 요세푸스 문제 0

👉 [문제 바로가기](https://www.acmicpc.net/problem/11866)


## 배경 지식
- `큐(Queue)` : 먼저 집어 넣은 데이터가 먼저 나오는 **FIFO(First In First Oout)구조**로 데이터를 저장하는 자료 구조

## 푼 방법
먼저 queue에 1 ~ n 까지의 사람을 en_queue한다. 

그리고 **queue의 앞에서부터 k-1 번째까지 모든 사람을 de_queue 했다가 en_queue하고, k 번째 사람은 de_queue 후 result array(linear list)에 en_queue한다.** 

queue가 빌 때까지 위의 과정을 반복하고, 마지막으로 result array를 출력한다.


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
	
	int n, k, idx=0;
	int result[1000];
	Queue<int> queue;
	
	std::cin >> n >> k;
	
	for (int i = 1; i <= n; ++i)
		queue.en_queue(i);
	
	while (queue.get_size() > 0) {
		for (int i = 0; i < k-1; ++i)
			queue.en_queue(queue.de_queue());
		
		result[idx++] = queue.de_queue();
	}
	
	std::cout << "<";
	for (int i = 0; i < n-1; ++i) {
		std::cout << result[i] << ", ";
	}
	std::cout << result[n-1] << ">" << std::endl;
	
	return 0;
}
~~~