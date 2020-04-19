---
title: "[백준] 2630 : 색종이 만들기"
date: "2020-04-13"
layout: post
draft: false
path: "/posts/baekjoons/2630/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 2630번 문제 : 색종이 만들기"
---

# 2630번 : 색종이 만들기

👉 [문제 바로가기](https://www.acmicpc.net/problem/2630)


## 배경 지식
 - `분할 정복(Divide and Conquer)` : 그대로 해결할 수 없는 주어진 문제를 **더 이상 문제를 나눌 수 없을 때까지 둘 이상의 작은 부분 문제로 분할하여 문제를 해결**하고, **구해진 문제들을 원 문제로 병합하여 해결**하는 알고리즘
 
 분할 정복 알고리즘은 **보통 재귀함수(recursive function)을 이용해서 구현하는 것이 일반적**이나 **빠른 실행, 부분 문제 해결 순서 선택 등**을 위해 재귀호출을 사용하지 않고 **스택(stack), 큐(queue) 등의 자료구조를 이용하여 구현**하기도 한다.
 
     1. 분할 (Divide) : 해결할 문제를 여러 개의 부분 문제로 나눈다.
	 2. 정복 (Conquer) : 나누어진 부분 문제를 각각 해결한다.
	 3. 통합 (Combine) : 해결된 해답을 모은다 (필요할 경우)


## 푼 방법
기본적인 분할 정복(divide and conquer) 문제이다. **4개의 부분 문제**로 분할, 정복해나가기 때문에 '**쿼드트리**'라고도 불린다.

색종이 배열을 입력받고, 분할 정복 재귀 함수를 구현한다. **분할한 문제에서 white(0) 이나 blue(1) 로만 이루어져 있지 않을 경우 계속 분할**한다; **더 이상 나누어 질 수 없을 때까지 계속 진행하여(= size : 1)** white(0) 개수와 blue(1) 개수를 구해나가고, 최종적으로 white(0) 개수와 blue(1) 개수를 출력한다. 


## 내 정답 코드 (C++)

~~~c
#include <iostream>

int colored_paper[128][128], w_cnt, b_cnt;

void divide_and_conquer(const int& row_idx, const int& col_idx, const int& size) {
	int element = colored_paper[row_idx][col_idx];
	
	for (int r = row_idx; r < size + row_idx; ++r) {
		for (int c = col_idx; c < size + col_idx; ++c) {
			if (colored_paper[r][c] != element) {
				divide_and_conquer(row_idx, col_idx + (size/2), size/2);            // 1사분면
				divide_and_conquer(row_idx, col_idx, size/2);                       // 2사분면
				divide_and_conquer(row_idx + (size/2), col_idx, size/2);            // 3사분면
				divide_and_conquer(row_idx + (size/2), col_idx + (size/2), size/2); // 4사분면
				return;
			}
		}
	}
	
	element == 1 ? ++b_cnt : ++w_cnt;
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	// white : 0, blue : 1
	int n;
	w_cnt = 0, b_cnt = 0;
	
	std::cin >> n;
	
	for (int i = 0 ; i < n; ++i) {
		for (int j = 0; j < n; ++j)
			std::cin >> colored_paper[i][j];
	}
	
	divide_and_conquer(0, 0, n);
	
	std::cout << w_cnt << '\n' << b_cnt << std::endl;
	
	return 0;
}
~~~

### References
https://data-make.tistory.com/232  
https://cinux.tistory.com/13  
https://janghw.tistory.com/entry/%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-Divide-and-Conquer-%EB%B6%84%ED%95%A0%EC%A0%95%EB%B3%B5  
https://ko.wikipedia.org/wiki/%EB%B6%84%ED%95%A0_%EC%A0%95%EB%B3%B5_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98  
https://ko.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms