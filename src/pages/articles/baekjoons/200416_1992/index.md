---
title: "[백준] 1992 : 쿼드트리"
date: "2020-04-16"
layout: post
draft: false
path: "/posts/baekjoons/1992/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 1992번 문제 : 쿼드트리"
---

# 1992번 : 쿼드트리

👉 [문제 바로가기](https://www.acmicpc.net/problem/1992)


## 배경 지식
 - `분할 정복(Divide and Conquer)` : 그대로 해결할 수 없는 주어진 문제를 **더 이상 문제를 나눌 수 없을 때까지 둘 이상의 작은 부분 문제로 분할하여 문제를 해결**하고, **구해진 문제들을 원 문제로 병합하여 해결**하는 알고리즘
 
 - `쿼드 트리(Quad Tree)` : 트리 자료구조 중 하나로 **부모 노드 아래 자식 노드를 4개(Quad)씩** 가지고 있는 트리


## 푼 방법
지난 포스트의 '2630 - 색종이 만들기' 문제와 매우 유사하다.

영상 데이터 배열을 입력받고, 4분할 정복 재귀 함수를 구현한다. **분할한 문제에서 white dot(0) 이나 black dot(1) 로만 이루어져 있지 않을 경우 계속 분할**한다; **더 이상 나누어 질 수 없을 때까지 계속 진행하여(= n : 1)** white dot(0) 으로만 이루어진 분할 문제에서는 0을 출력하고, black dot(1) 로만 이루어진 분할 문제에서는 1을 출력한다.

2630번 문제와 한가지 다른 점이 있다면, 분할 문제에 대해서는 괄호로 구분을 해줘야 하는 것인데, 분할이 시작되고 끝날 때 괄호를 출력해주면 된다. 


## 내 정답 코드 (C++)

~~~c
#include <iostream>
#include <string>

bool video[64][64];

void daq (const int& row_idx, const int& col_idx, const int& n) {
	bool dot_colour = video[row_idx][col_idx];
	
	for (int r = row_idx; r < (n+row_idx); ++r) {
		for (int c = col_idx; c < (n+col_idx); ++c) {
			if (video[r][c] == dot_colour)
				continue;
			else {
				std::cout << "(";
				
				daq(row_idx, col_idx, n/2); // 왼쪽 위
				daq(row_idx, col_idx + (n/2), n/2); // 오른쪽 위
				daq(row_idx + (n/2), col_idx, n/2); // 왼쪽 아래
				daq(row_idx + (n/2), col_idx + (n/2), n/2); // 오른쪽 아래
				
				std::cout << ")";
				
				return;
			}
		}
	}
	if (dot_colour)
		std::cout << "1";
	else
		std::cout << "0";
}


int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n;
	std::string temp;
	
	std::cin >> n;
	
	for (int i = 0; i < n; ++i) {
		std::cin >> temp;
		
		for (int j = 0; j < temp.size(); ++j)
			video[i][j] = temp[j] - '0';
	}
	
	daq(0, 0, n);
	
	std::cout << std::endl;
	
	return 0;
}
~~~

### References
https://m.blog.naver.com/PostView.nhn?blogId=qkfkf123&logNo=60179360083&proxyReferer=https:%2F%2Fwww.google.com%2F  
https://chessire.tistory.com/entry/%EC%BF%BC%EB%93%9C%ED%8A%B8%EB%A6%ACQuad-tree  
https://minho331.tistory.com/6
