---
title: "[자료구조] Queue(큐)"
date: "2020-03-30"
layout: post
draft: false
path: "/posts/data_structures/queue/"
category: "Data Structure"
tags:
  - "Data Structure"
description: "Queue(큐)에 대해 알아보자."
---

# Queue(큐)

## Queue(큐)란?

 - 먼저 집어 넣은 데이터가 먼저 나오는 **FIFO(First In First Oout)구조**로 데이터를 저장하는 자료 구조이다; **가장 먼저 en_queue(push)된 값**이 **가장 처음 de_queue(pop)**된다.
 
![Queue(큐)](./queue_animation.gif)
[^출처]

## Queue(큐) 구현
Queue(큐)에는 **선형**과 **환형**이 존재한다. 선형 큐의 **크기가 제한되어 있고 de_queue 연산시 모든 데이터를 한 칸씩 옮겨야 하는 단점**을 보완하여 만들어진 환형 큐이지만, 환형 큐도 **큐의 길이를 유동적으로 늘릴 수 없는 단점**이 있기에 이 포스트에서는 lineked list(연결 리스트)로 queue(큐)를 구현한다.

Queue(큐) 구현 시 다음의 메소드들은 꼭 필요하다.

 1. **en_queue(data) = 삽입(push)** : data node를 queue에 push(삽입)한다.
 2. **de_queue() = 삭제(pop)** : queue(큐)의 front(head) node를 pop(삭제)하고, 가장 앞에 있는 node를 front(head) node로 지정한다.
 
추가적으로 queue가 비었는지 차있는지 확인해주는 is_empty()메소드와, front(head) & rear(tail) 노드의 데이터를 반환해주는 get_front() & get_rear()메소드들과 같이, 상황에 맞게 만들어진 사용자 정의 메소드들이 많이 쓰인다.


## Queue(큐) linked list 구현 코드 (C++)

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
	
	T get_head() {
		if (is_empty()) // empty queue
			return -1; // T type에 맞는 error code return.
		else
			return this->head->data;
	}
	
	T get_tail() {
		if (is_empty()) // empty queue
			return -1; // T type에 맞는 error code return.
		else
			return this->tail->data;
	}
	
	friend std::ostream& operator <<(std::ostream &out, Queue<T> &queue){
		Node<T> *temp = queue.head;
		
		for (int i = 0; i < queue.get_size(); ++i)
			out << "──";
		std::cout << std::endl;
		
		while(temp != nullptr) {
			out << temp->data << " ";
			temp = temp->rear;
		}
		std::cout << std::endl;
		
		for (int i = 0; i < queue.get_size(); ++i)
			out << "──";
		std::cout << std::endl;
		
		return out;
	}	
};
int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	Queue<int> queue;
	
	std::cout << "Queue en_queue(push) : " << 1 << std::endl;
	queue.en_queue(1);
	std::cout << queue;
	
	std::cout << "Queue en_queue(push) : " << 2 << std::endl;
	queue.en_queue(2);
	std::cout << queue;
	
	std::cout << "Queue en_queue(push) : " << 4 << std::endl;
	queue.en_queue(4);
	std::cout << queue;
	
	std::cout << "Queue length(size) : " << queue.get_size() << std::endl;
	std::cout << "Queue front(head) : " << queue.get_head() << std::endl;
	std::cout << "Queue rear(tail) : " << queue.get_tail() << std::endl;
	
	
	std::cout << "Queue de_queue(pop) : " << queue.de_queue() << std::endl;
	std::cout << queue;
	
	std::cout << "Queue de_queue(pop) : " << queue.de_queue() << std::endl;
	std::cout << queue;
	
	std::cout << "Queue de_queue(pop) : " << queue.de_queue() << std::endl;
	std::cout << queue;
	
	std::cout << "Queue de_queue(pop) : " << queue.de_queue() << std::endl;
	std::cout << queue;
	
	return 0;
}
~~~

### 참고 사이트
https://ko.wikipedia.org/wiki/%ED%81%90_(%EC%9E%90%EB%A3%8C_%EA%B5%AC%EC%A1%B0)  
https://gmlwjd9405.github.io/2018/08/02/data-structure-queue.html  
https://galid1.tistory.com/483  


[^출처]: https://medium.com/@1991dharapatel/javascript-stacks-and-queues-136fabab8359
