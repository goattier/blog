---
title: "[알고리즘] Stack(스택)"
date: "2020-04-19"
layout: post
draft: false
path: "/posts/alogorithms/binary_search/"
category: "Algorithm"
tags:
  - "Algorithm"
description: "Binary Search(이진 탐색)에 대해 알아보자."
---

# Binary Search(이진 탐색)

## Binary Search(이진 탐색)이란?

 - 오름차순 혹은 내림차순(일반적으로 오름차순)으로 **정렬된 리스트**에서 특정한 값의 위치를 찾는 알고리즘; **중앙 값을 선택**하여 **대소 비교 후 범위를 갱신하고 특정 값을 찾을 때까지 계속 범위를 갱신하며 중간 값을 찾아나가는 알고리즘**
 - Binary Search(이진 탐색)은 **정렬된 자료**에서 실행될 경우에만 유효하다. 
 - **Worst case : O(logn)**  
   **Best case : O(1)**
 - **Binary Search(이진 탐색)** & **Linear Search(선형 탐색)** 비교 : 평균적으로 Binary Search(이진 탐색)이 **처리속도가 훨씬 빠르다.**  
![Binary Search(이진 탐색)](./binary_and_linear_search_animations.gif)
출처[^1]

[^1]: 
https://blog.penjee.com/binary-vs-linear-search-animated-gifs/

## Binary Search(이진 탐색) 구현
Binary Search(이진 탐색)은 **Recursive(재귀)** 또는 **Iterative(반복)** 으로 구현 가능하다. 보편적으로 **재귀보다는 반복문이 스택으로 인한 오버헤드가 없어서 더 선호되는 편**이다.


## Binary Search(이진 탐색) Iterative(반복) 구현 코드 (C++)

~~~c
#include <iostream>

int binary_search_iterative(int* arr, const int& length, const int& value) {
	if (arr == nullptr || length < 0)
		return -1;
	
	int left = 0, right = length - 1, mid;
	
	while (left <= right) {
		mid = left + ((right - left) / 2);
		
		if (arr[mid] == value)
			return mid;
		else
			arr[mid] > value ? right = mid - 1 : left = mid + 1;
	}
	
	return -1;
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int nums[13] = {1, 3, 5, 7, 9, 45, 55, 66, 77, 122, 133, 1444 ,15555};
	
	std::cout << binary_search_iterative(nums, 0, 12, 5) << std::endl;
	
	return 0;
}
~~~

## Binary Search(이진 탐색) Recursive(재귀) 구현 코드 (C++)

~~~c
#include <iostream>

int binary_search_recursive(int* arr, const int& left, const int& right, const int& value) {
	if (left > right)
		return -1;

	int mid = left + ((right - left) / 2);
	
	if(arr[mid] == value)
		return mid;
	else
		arr[mid] > value ? binary_search_recursive(arr, left, mid - 1, value) : binary_search_recursive(arr, mid + 1, left, value);
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int nums[13] = {1, 3, 5, 7, 9, 45, 55, 66, 77, 122, 133, 1444 ,15555};
	
	std::cout << binary_search_recursive(nums, 0, 12, 5) << std::endl;
	
	return 0;
}
~~~


### References  
https://anster.tistory.com/152  
https://www.geeksforgeeks.org/binary-search/  
https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%A7%84_%EA%B2%80%EC%83%89_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98  
https://m.blog.naver.com/PostView.nhn?blogId=kks227&logNo=220403975420&proxyReferer=https:%2F%2Fwww.google.com%2F