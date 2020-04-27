---
title: "[백준] 11401 : 이항 계수 3"
date: "2020-04-27"
layout: post
draft: false
path: "/posts/baekjoons/11401/"
category: "백준"
tags:
  - "백준"
  - "Algorithm"
description: "백준 11401번 문제 : 이항 계수 3"
---

# 11401번 : 이항 계수 3

👉 [문제 바로가기](https://www.acmicpc.net/problem/11401)



## 배경 지식
 - `이항 계수(Binomial coefficient)` : 주어진 크기 집합에서 원하는 개수만큼 **순서없이** 뽑는 조합의 가짓 수
 - `분할 정복(Divide and Conquer)` : 그대로 해결할 수 없는 주어진 문제를 **더 이상 문제를 나눌 수 없을 때까지 둘 이상의 작은 부분 문제로 분할하여 문제를 해결**하고, **구해진 문제들을 원 문제로 병합하여 해결**하는 알고리즘


## 푼 방법
어려웠다. 이 문제에 쓰이는 수학 공식을 모른다면 풀기 어려운 문제다.

다음 포스트를 참고해서 풀었다.
> https://kyunstudio.tistory.com/60

푼 방법을 적어봤자 위 포스트와 내용이 비슷할 것이기 때문에 굳이 적지 않겠다.

단 하나 위 포스트의 코드와 다른 것이 있다면, 본 문제에서 전처리는 필요 없을 것 같아 **전처리하지 않고 입력받은 이항계수를 페르마의 소정리를 이용해 바로 구했다.**


## 내 정답 코드 (C++)
~~~c
#include <iostream>
#define P 1000000007LL

typedef unsigned long long ull;

ull mod_power (ull x, ull y) {
	ull ret = 1;
	while (y) { // y > 0
		if (y & 1) { // y % 2
			ret *= x;
			ret %= P; // if not mod, delete
		}
		x *= x;
		x %= P; // if not mod, delete
		y /= 2;
	}
	return ret;
}

int main() {
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL); 
	std::cout.tie(NULL);
	
	int n, k;
	ull factorial[4000001] = {0, };
	
	std::cin >> n >> k;
	
	if (n == k || k == 0) {
        std::cout << 1 << std::endl;
        return 0;
    }
	
	factorial[1] = 1;
	
	for (int i = 2; i <= n; ++i)
		factorial[i] = (factorial[i-1] * i) % P;
	
	std::cout << (factorial[n] * mod_power((factorial[k]*factorial[n-k]) % P, P-2)) % P << std::endl;

	return 0;
}
~~~

### References
https://onsil-thegreenhouse.github.io/programming/problem/2018/04/02/problem_combination/  
https://sexycoder.tistory.com/67  
https://shoark7.github.io/programming/algorithm/3-ways-to-get-binomial-coefficients  
https://www.acmicpc.net/board/view/15795
