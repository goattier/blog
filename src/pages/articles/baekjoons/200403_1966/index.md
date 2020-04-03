---
title: "[백준] 1966 : 프린터 큐"
date: "2020-04-03"
layout: post
draft: false
path: "/posts/baekjoons/1966/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1966번 문제 : 프린터 큐"
---

# 1966번 : 프린터 큐

👉 [문제 바로가기](https://www.acmicpc.net/problem/1966)


## 배경 지식
- `큐(Queue)` : 먼저 집어 넣은 데이터가 먼저 나오는 **FIFO(First In First Oout)구조**로 데이터를 저장하는 자료 구조

## 푼 방법
우선 큐 클래스에 전체 노드를 순회하고 최대 값을 구하는 메소드를 추가했다. 그리고 문서들의 중요도를 순서대로 큐에 en_queue하고 몇 번째로 인쇄되는지 알고 싶은 문서는 0으로 en_queue하고 그 문서의 중요도는 따로 변수에 저장했다; 0으로 flag 역할을 수행시키기 위해서였다.

큐에 문서들의 중요도를 순서대로 다 저장한 후, 문제에서 요구한 rule대로 de_queue했을 때 중요도를 큐에 현존하는 최대 중요도 값과 비교하면서 인쇄 순서를 count해나갔다. 알고싶은 문서는 0으로 flag해놔서 idx가 변화해도 쉽게 알 수 있다; 중요도는 따로 저장해둔 변수 활용하여 비교했다.

이번 풀이법은 개인적으로 마음에 들지 않는다. 이런 방법으로도 비효율적으로 풀 수 있구나, 이래서 자료구조를 빠삭하게 공부해야 하는 구나라고 느끼며 이 포스트를 읽었으면 좋겠다.

프린터 큐이기 때문에 큐를 갖고 풀 생각만 했다. 제목에서 고정관념을 갖고 사고의 폭을 넓히지 못했던 것 같다.

다음 포스트에서는 우선순위 큐와 힙을 정리하고, 좀 더 효율적이고 깔끔한 방법으로 이 문제를 다시 풀어 볼 예정이다.


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
	
	T get_max() {
        if (is_empty())
            return -1;
        
		Node<T> *cur = this->tail;
		T max = this->tail->data;
		
		while (cur != nullptr) {
			if (cur->data > max)
				max = cur->data;
			
			cur = cur->front;
		}
		
		return max;
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
	
	int n;
	
	std::cin >> n;
	
	for (int i = 0; i < n; ++i) {
		int n_doc, m, m_priority, priority, cnt = 0;
		Queue<int> queue;
		
		std::cin >> n_doc >> m;
		
		for (int j = 0; j < n_doc; ++j) {
			std::cin >> priority;
			
			if (j == m) {
				queue.en_queue(0);
				m_priority = priority;
			}
			else
				queue.en_queue(priority);
		}
		
		if (n_doc == 1) {
			std::cout << 1 << '\n';
			continue;
		}
		
		while (m_priority != -1) {
			priority = queue.de_queue();
			
			if (priority == 0) { // 궁금한 문서
				if (m_priority < queue.get_max())
					queue.en_queue(priority);
				else {
					++cnt;
					m_priority = -1;
				}
			}
			else { // 궁금하지 않은 나머지 일반 문서들
				if (priority < queue.get_max() || priority < m_priority) {
					queue.en_queue(priority);
					continue;
				}
				
				++cnt;
			}
		}
		
		std::cout << cnt << '\n';
	}
	
	return 0;
}
~~~